// Importar modulos
const fs = require("fs");
const path = require("path");
const User = require("../models/user");

// Importar modelos
const Publication = require("../models/publication");

// Importar servicios
const followService = require("../services/followService");
const bookmarkService = require("../services/bookmarkService");

// Acciones de prueba
const pruebaPublication = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/publication.js"
    });
}

// Guardar publicacion
const save = (req, res) => {
    const params = req.body;
    if (!params.text) return res.status(400).send({ status: "error", message: "Debes enviar el texto de la publicacion." });

    let newPublication = new Publication(params);
    newPublication.user = req.user.id;

    newPublication.save((error, publicationStored) => {
        if (error || !publicationStored) return res.status(400).send({ status: "error", message: "No se ha guardado la publicación." });

        return res.status(200).send({
            status: "success",
            message: "Publicación guardada",
            publicationStored
        });
    });
}

// Sacar una publicacion
const detail = (req, res) => {
    const publicationId = req.params.id;

    Publication.findById(publicationId, (error, publicationStored) => {
        if (error || !publicationStored) {
            return res.status(404).send({
                status: "error",
                message: "No existe la publicacion"
            });
        }

        return res.status(200).send({
            status: "success",
            message: "Mostrar publicacion",
            publication: publicationStored
        });
    });
}

// Eliminar publicaciones
const remove = (req, res) => {
    const publicationId = req.params.id;

    Publication.find({ "user": req.user.id, "_id": publicationId }).remove(error => {
        if (error) {
            return res.status(500).send({
                status: "error",
                message: "No se ha eliminado la publicacion"
            });
        }

        return res.status(200).send({
            status: "success",
            message: "Eliminar publicacion",
            publication: publicationId
        });
    });
}

// listar publicaciones de un usuario
const user = (req, res) => {
    const userId = req.params.id;
    let page = parseInt(req.params.page) || 1;
    const itemsPerPage = 5;

    Publication.find({ "user": userId })
        .sort("-created_at")
        .populate('user', '-password -__v -role -email')
        .paginate(page, itemsPerPage, async (error, publications, total) => {
            if (error || !publications || publications.length <= 0) {
                return res.status(404).send({
                    status: "error",
                    message: "No hay publicaciones para mostrar"
                });
            }

            const bookmarkSet = await bookmarkService.getUserBookmarkSet(req.user.id);
            const publicationsWithBookmark = publications.map(pub => ({
                ...pub.toObject(),
                isBookmarked: bookmarkSet.has(pub._id.toString())
            }));

            return res.status(200).send({
                status: "success",
                message: "Publicaciones del perfil de un usuario",
                page,
                total,
                pages: Math.ceil(total / itemsPerPage),
                publications: publicationsWithBookmark
            });
        });
}

// Subir ficheros
const upload = (req, res) => {
    const publicationId = req.params.id;

    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "Petición no incluye la imagen"
        });
    }

    // req.file.path ahora es la URL pública de Cloudinary, no un path local
    Publication.findOneAndUpdate(
        { "user": req.user.id, "_id": publicationId },
        { file: req.file.path },
        { new: true },
        (error, publicationUpdated) => {
            if (error || !publicationUpdated) {
                console.log('###### UPLOAD CATCH REACHED ######')
                console.log('UPLOAD ERROR DETAIL:', JSON.stringify(error, null, 2))
                return res.status(500).send({
                    status: "error",
                    message: "Error en la subida de la imagen"
                });
            }

            return res.status(200).send({
                status: "success",
                publication: publicationUpdated,
                file: req.file
            });
        }
    );
}


// Listar todas las publicaciones (FEED)
const feed = async (req, res) => {
    let page = parseInt(req.params.page) || 1;   // de paso, el fix de paginación pendiente
    let itemsPerPage = 5;

    try {
        const myFollows = await followService.followUserIds(req.user.id);

        Publication.find({ user: { $in: [...myFollows.following, req.user.id] } })
            .populate("user", "-password -role -__v -email")
            .sort("-created_at")
            .paginate(page, itemsPerPage, (error, publications, total) => {
                if (error || !publications) {
                    return res.status(500).send({
                        status: "error",
                        message: "No hay publicaciones para mostrar",
                    });
                }

                return res.status(200).send({
                    status: "success",
                    message: "Feed de publicaciones",
                    following: myFollows.following,
                    total,
                    page,
                    pages: Math.ceil(total / itemsPerPage),
                    publications
                });
            });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al obtener usuarios que sigues",
        });
    }
}

/* --------- NUEVAS FUNCIONALIDADES --------- */

// Dar o quitar like
const toggleLike = async (req, res) => {
    const publicationId = req.params.id;
    const userId = req.user.id;

    try {
        const publication = await Publication.findById(publicationId);
        if (!publication) {
            return res.status(404).send({ status: "error", message: "Publicación no encontrada" });
        }

        const index = publication.likes.indexOf(userId);
        if (index === -1) {
            publication.likes.push(userId);
        } else {
            publication.likes.splice(index, 1);
        }

        await publication.save();

        return res.status(200).send({
            status: "success",
            message: index === -1 ? "Like agregado" : "Like quitado",
            likesCount: publication.likes.length
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error en toggle like" });
    }
}

// Agregar comentario
const addComment = async (req, res) => {
    const publicationId = req.params.id;
    const userId = req.user.id;
    const { text } = req.body;

    if (!text) {
        return res.status(400).send({ status: "error", message: "Debes enviar texto del comentario" });
    }

    try {
        const publication = await Publication.findById(publicationId);
        if (!publication) {
            return res.status(404).send({ status: "error", message: "Publicación no encontrada" });
        }

        const comment = {
            user: userId,
            text,
            created_at: new Date()
        };

        publication.comments.push(comment);
        await publication.save();

        return res.status(200).send({
            status: "success",
            message: "Comentario agregado",
            comment
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error al agregar comentario" });
    }
}

// Eliminar comentario
const removeComment = async (req, res) => {
    const publicationId = req.params.id; // ID de la publicación
    const commentId = req.params.commentId; // ID del comentario
    const userId = req.user.id; // Usuario que hace la petición

    try {
        // Buscar la publicación
        const publication = await Publication.findById(publicationId);
        if (!publication) {
            return res.status(404).send({ status: "error", message: "Publicación no encontrada" });
        }

        // Buscar el comentario
        const comment = publication.comments.id(commentId);
        if (!comment) {
            return res.status(404).send({ status: "error", message: "Comentario no encontrado" });
        }

        // Solo el usuario que escribió el comentario o el dueño de la publicación puede borrarlo
        if (comment.user.toString() !== userId && publication.user.toString() !== userId) {
            return res.status(403).send({ status: "error", message: "No tienes permiso para eliminar este comentario" });
        }

        // Eliminar el comentario
        comment.remove();
        await publication.save();

        return res.status(200).send({
            status: "success",
            message: "Comentario eliminado",
            publication
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error al eliminar comentario" });
    }
}


// Listar comentarios
const listComments = async (req, res) => {
    const publicationId = req.params.id;

    try {
        const publication = await Publication.findById(publicationId)
            .populate('comments.user', 'name surname nick image');

        if (!publication) {
            return res.status(404).send({ status: "error", message: "Publicación no encontrada" });
        }

        return res.status(200).send({
            status: "success",
            comments: publication.comments
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error al listar comentarios" });
    }
}

// Buscar publicaciones por texto o autor
const search = async (req, res) => {
    const query = req.params.query;
    let page = parseInt(req.params.page) || 1;
    const itemsPerPage = 5;

    if (!query || query.trim().length < 2) {
        return res.status(400).send({
            status: "error",
            message: "La búsqueda debe tener al menos 2 caracteres"
        });
    }

    try {
        const matchingUserIds = (await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { nick: { $regex: query, $options: 'i' } }
            ]
        }).select('_id')).map(user => user._id);

        const bookmarkSet = await bookmarkService.getUserBookmarkSet(req.user.id);

        Publication.find({
            $or: [
                { text: { $regex: query, $options: 'i' } },
                { user: { $in: matchingUserIds } }
            ]
        })
            .sort("-created_at")
            .populate('user', '-password -__v -role -email')
            .paginate(page, itemsPerPage, (error, publications, total) => {
                if (error) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error al buscar publicaciones"
                    });
                }

                const publicationsWithBookmark = (publications ?? []).map(pub => ({
                    ...pub.toObject(),
                    isBookmarked: bookmarkSet.has(pub._id.toString())
                }));

                return res.status(200).send({
                    status: "success",
                    message: "Resultados de búsqueda",
                    page,
                    total,
                    pages: Math.ceil(total / itemsPerPage),
                    publications: publicationsWithBookmark
                });
            });
    } catch (error) {
        console.error('Error en búsqueda de publicaciones:', error);
        return res.status(500).send({
            status: "error",
            message: "Error al buscar publicaciones",
            error: error.message
        });
    }
}

// Guardar o quitar un post de guardados
const toggleBookmark = async (req, res) => {
    const publicationId = req.params.id;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
        }

        const index = user.bookmarks.indexOf(publicationId);
        if (index === -1) {
            user.bookmarks.push(publicationId);
        } else {
            user.bookmarks.splice(index, 1);
        }

        await user.save();

        return res.status(200).send({
            status: "success",
            message: index === -1 ? "Guardado agregado" : "Guardado quitado",
            isBookmarked: index === -1
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error en toggle bookmark" });
    }
}

module.exports = {
    pruebaPublication,
    save,
    detail,
    search,
    remove,
    user,
    upload,
    feed,
    toggleLike,
    addComment,
    removeComment,
    listComments,
    toggleBookmark,
}
