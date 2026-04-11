/*users.mock.js*/
export const usersData = [
  {
    id: "erch",
    userName: "Vera",
    userSurName: "Cherry",
    userNick: "Cherry92",
    avatarUrl: null,
    isOnline: true,
    following: [
      { userId: "fer_c" }
    ],
    followers: [
      { userId: "fer_c" }
    ]
  },
  {
    id: "fer_c",
    userName: "Fernan",
    userSurName: "Herrs",
    userNick: "Fifa12",
    avatarUrl: null,
    isOnline: false,
    following: [
      { userId: "erch" }
    ],
    followers: [
      { userId: "erch" }
    ]
  }
];