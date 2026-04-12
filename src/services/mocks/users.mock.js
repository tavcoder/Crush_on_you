/*users.mock.js*/
export const usersData = [
  {
    id: "erch",
    userName: "Vera",
    userSurName: "Cherry",
    userNick: "Cherry92",
    avatarUrl: null,
    isOnline: true,
    hasStory: true,
    isUnseen: false,
    following: [
      { userId: "ver_c" }
    ],
    followers: [
      { userId: "ver_c" }
    ]
  },
  {
    id: "ver_c",
    userName: "Fernan",
    userSurName: "Herrs",
    userNick: "Fifa12",
    avatarUrl: null,
    isOnline: false,
    hasStory: true,
    isUnseen: true,
    following: [
      { userId: "erch" }
    ],
    followers: [
      { userId: "erch" }
    ]
  }
];