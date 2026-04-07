// utils/enrichPosts.js
export function enrichPostsWithUserData(posts, users) {
  return posts.map(post => {
    const author = users.find(user => user.id === post.authorId);

    return {
      ...post,
      author: {
        id: post.authorId,
        userName: author?.userName,
        userSurName: author?.userSurName,
        avatarUrl: author?.avatarUrl,
        isOnline: author?.isOnline ?? false,
      }
    };
  });
}