// api/adapters/posts.adapter.js


export function adaptPost(raw) {
    return raw

    // return {
    //     id: raw._id,
    //     content: raw.body,
    //     authorId: raw.author_id,
    //     stats: {
    //         likesCount: raw.likes,
    //         commentsCount: raw.comments_count,
    //     }
    // }
}

export function adaptPostList(raw) {
    return raw

    // return {
    //     data: raw.posts.map(adaptPost),
    //     pagination: {
    //         currentPage: raw.page,
    //         totalPages: raw.pages,
    //     }
    // }
}