/** @typedef {import('../contracts/types.js').PostRaw} PostRaw */
/** @typedef {import('../contracts/types.js').User} User */
/** @typedef {import('../contracts/types.js').Post} Post */

/**
 * @param {PostRaw[]} posts
 * @param {User[]} users
 * @returns {Post[]}
 */

export function enrichPostsWithUserData(posts, users) 
    {

  return posts.map(post => {
    const author = users.find(user => user.id === post.authorId);

    return {
      ...post,
      author: author
        ? {
          id: author.id,
          userName: author.userName,
          userSurName: author.userSurName,
          avatarUrl: author.avatarUrl,
          isOnline: author.isOnline ?? false,
        }
        : null
    };
  });
}