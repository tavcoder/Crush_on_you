// Importar modelos
const Follow = require("../models/follow");
const Publication = require("../models/publication");
const User = require("../models/user");

// Importar servicio
const followService = require("../services/followService");

// Accion de guardar un follow (accion seguir)
const save = async (req, res) => {
    try {
        const params = req.body;
        const identity = req.user;

        // Validar que venga el campo "followed"
        if (!params.followed) {
            return res.status(400).send({
                status: "error",
                message: "Debes indicar el ID del usuario a seguir"
            });
        }

        // Verificar que el usuario seguido exista
        const userExists = await User.findById(params.followed).select("_id").lean();
        if (!userExists) {
            return res.status(404).send({
                status: "error",
                message: "El usuario que intentas seguir no existe"
            });
        }

        // Evitar seguirse a uno mismo
        if (params.followed.toString() === identity.id.toString()) {
            return res.status(400).send({
                status: "error",
                message: "No puedes seguirte a ti mismo"
            });
        }

        // Evitar duplicados (ya seguir a ese usuario)
        const alreadyFollowing = await Follow.findOne({
            user: identity.id,
            followed: params.followed
        }).lean();

        if (alreadyFollowing) {
            return res.status(400).send({
                status: "error",
                message: "Ya estás siguiendo a este usuario"
            });
        }

        // Crear el follow
        let userToFollow = new Follow({
            user: identity.id,
            followed: params.followed
        });

        const followStored = await userToFollow.save();

        return res.status(200).send({
            status: "success",
            identity: req.user,
            follow: followStored
        });

    } catch (error) {
        console.error("Error en save follow:", error);
        return res.status(500).send({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};

// Accion de borrar un follow (accion dejar de seguir)
const unfollow = (req, res) => {
    // Recoger el id del usuario identificado
    const userId = req.user.id;
    // Recoger el id del usuario que sigo y quiero dejar de seguir
    const followedId = req.params.id;
    // Find de las coincidencias y hacer remove
    Follow.findOneAndDelete({
        "user": userId,
        "followed": followedId
    }).then((followDeleted) => {
        if (!followDeleted) {
            return res.status(500).send({
                status: "error",
                message: "No has dejado de seguir a nadie"
            });
        }
        return res.status(200).send({
            status: "success",
            message: "Follow eliminado correctamente"
        });
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "Error interno del servidor"
        });
    });
};

// Función base para obtener seguidores o seguidos
const getFollowsBase = async (req, res, queryType) => {
    try {
        const userId = req.params.id || req.user.id;
        const page = parseInt(req.params.page) || 1;
        const itemsPerPage = 5;

        let query = {};
        let populateField = "";
        let message = "";

        if (queryType === 'followers') {
            query = { followed: userId };
            populateField = "user";
            message = "Listado de usuarios que siguen a este usuario";
        } else if (queryType === 'following') {
            query = { user: userId };
            populateField = "followed";
            message = "Listado de usuarios que este usuario está siguiendo";
        } else {
            return res.status(400).send({
                status: "error",
                message: "Tipo de consulta no válido. Usa 'followers' o 'following'."
            });
        }

        const total = await Follow.countDocuments(query);

        const follows = await Follow.find(query)
            .populate(populateField, "-password -role -__v -email")
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .lean();

        if (!follows || follows.length === 0) {
            return res.status(200).send({
                status: "success",
                message: "No se encontraron relaciones de seguimiento para este usuario."
            });
        }

        let followUserIds = {};
        if (req.user && req.user.id) {
            followUserIds = await followService.followUserIds(req.user.id);
        } else {
            followUserIds = { following: [], followers: [] };
        }

        return res.status(200).send({
            status: "success",
            message,
            follows,
            total,
            page,
            pages: Math.ceil(total / itemsPerPage),
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers
        });

    } catch (error) {
        console.error(`Error en getFollowsBase (${queryType}):`, error);
        return res.status(500).send({
            status: "error",
            message: "Error interno del servidor al obtener las relaciones de seguimiento."
        });
    }
};

const following = (req, res) => {
    return getFollowsBase(req, res, 'following');
};

const followers = (req, res) => {
    return getFollowsBase(req, res, 'followers');
};

// Exportar acciones
module.exports = {
    save,
    unfollow,
    following,
    followers
};