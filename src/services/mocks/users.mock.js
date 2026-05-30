/*users.mock.js*/
export const usersData = [
  {
    id: "erch",
    userName: "Vera",
    userSurName: "Cherry",
    userNick: "Cherry92",
    avatarUrl: null,
    city: "Madrid",
    country: "Spain",
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
    city: "Estocolmo",
    country: "Suecia",
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