// posts.api.js
import { apiClient } from '../apiClient'
import { adaptPost, adaptPostList } from './adapters/posts.adapter'

export const getPosts = ({ page = 1 } = {}, currentUserId) =>
    apiClient
        .get(`publication/feed/${page}`)
        .then(res => adaptPostList(res, currentUserId))

export const getPost = (id, currentUserId) =>
    apiClient.get(`publication/detail/${id}`)
        .then(res => adaptPost(res.publication, currentUserId))

export const getPostsByUser = (userId, { page = 1 } = {}, currentUserId) =>
    apiClient
        .get(`publication/user/${userId}/${page}`)
        .then(res => adaptPostList(res, currentUserId))

// TODO: [DEUDA TÉCNICA] El backend no tiene endpoint de búsqueda de publicaciones.
// Implementar GET publication/search?q= en el backend.
export const searchPosts = () => Promise.resolve({ data: [], pagination: { currentPage: 1, totalPages: 1 } })

const sanitizeFile = (file) => {
    const ext = file.name.split('.').pop()
    const baseName = file.name.replace(/\./g, '-').replace(new RegExp(`-${ext}$`), '')
    return new File([file], `${baseName}.${ext}`, { type: file.type })
}

export const createPost = async (data) => {
    const res = await apiClient.call('POST', 'publication/save', {
        text: data.content,
    })

    const publication = adaptPost(res.publicationStored)


    if (data.files && data.files.length > 0) {
        // TODO: [DEUDA TÉCNICA] El backend no actualiza la imagen en la publicación.
        // Investigar por qué Publication.findOneAndUpdate no encuentra el documento.
        // El upload llega correctamente (file0 en payload) pero no se persiste.
        const cleanFile = sanitizeFile(data.files[0])
        await apiClient.upload(`publication/upload/${publication.id}`, cleanFile)
    }
    const cleanFile = sanitizeFile(data.files[0])
    await apiClient.upload(`publication/upload/${publication.id}`, cleanFile)
    console.log(publication.id)
}

return { ...res, publicationStored: publication }
}

export const likePost = (id) =>
    apiClient.call('POST', `publication/${id}/like`)

export const deletePost = (id) =>
    apiClient.call('DELETE', `publication/remove/${id}`)