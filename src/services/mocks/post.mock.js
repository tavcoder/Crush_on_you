// posts.mock.js
export const postsData = [
     {
     id: "post_1",
       authorId: "ver_c",
       content: "It's okay baby girl, I got you... 😍 ❤️",
       images: ["/img/lavander.png","/img/blue.png"],
       stats: {
           likesCount: 2400,
           commentsCount: 89,
           sharesCount: 156
       },
       isLiked: true,
       isBookmarked: true,
       createdAt: "2024-08-14T14:15:00Z",
       profileDetails: {
           education: "Bachelor of Software Eng",
           drink: "Sometimes",
           languages: "Rusian",
           marijuana: "No"
       },
   },
     {
       id: "post_2",
       authorId: "vdfswgfwe_ce",
       content: "",
       images: [],
       stats: {
           likesCount: 23,
           commentsCount: 6,
           sharesCount: 0
       },
       isLiked: false,
       isBookmarked: false,
       createdAt: "2024-08-14T14:15:00Z",
       profileDetails: {
           education: "Bachelor of Software Eng",
           drink: "Sometimes",
           languages: "Rusian",
           marijuana: "No"
       },
   }
]