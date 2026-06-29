export const usersData = [
  {
    id: "erch",
    userName: "Vera",
    userSurName: "Cherry",
    userNick: "Cherry92",
    email: "test@gmail.com",
    password: "Test!123",
    avatarUrl: null,
    city: "Madrid",
    country: "Spain",
    isOnline: true,
    hasStory: true,
    isUnseen: false,
    following: [{ userId: "ver_c" }],
    followers: [{ userId: "ver_c" }, { userId: "luna_m" }, { userId: "kai_d" }],
    interests: [
      { id: "int_1", label: "Photography" },
      { id: "int_2", label: "Travel" },
      { id: "int_3", label: "Cooking" }
    ],
    profileDetails: {
      education: "Bachelor of Software Engineering",
      drink: "Sometimes",
      languages: "English, Spanish",
      marijuana: "No",
      smoke: "No",
      bio: "Full-stack developer by day, amateur chef by night. Always planning my next trip."
    }
  },
  {
    id: "ver_c",
    userName: "Fernan",
    userSurName: "Herrera",
    userNick: "Fifa12",
    email: "test@gmail.com",
    password: "Test!123",
    avatarUrl: null,
    city: "Stockholm",
    country: "Sweden",
    isOnline: true,
    hasStory: true,
    isUnseen: true,
    following: [{ userId: "erch" }, { userId: "r_c" }, { userId: "luna_m" }],
    followers: [{ userId: "erch" }, { userId: "r_c" }],
    interests: [
      { id: "int_4", label: "Gaming" },
      { id: "int_5", label: "Football" },
      { id: "int_6", label: "Music" }
    ],
    profileDetails: {
      education: "Bachelor of Software Engineering",
      drink: "Socially",
      languages: "Swedish, English",
      marijuana: "No",
      smoke: "No",
      bio: "Football fanatic and weekend gamer. Looking for people to join my FIFA league."
    }
  },
  {
    id: "r_c",
    userName: "Ramon",
    userSurName: "Costa",
    userNick: "Jalapeno",
    email: "test@gmail.com",
    password: "Test!123",
    avatarUrl: null,
    city: "Montpellier",
    country: "France",
    isOnline: true,
    hasStory: true,
    isUnseen: true,
    following: [{ userId: "ver_c" }, { userId: "sofia_r" }],
    followers: [{ userId: "ver_c" }, { userId: "sofia_r" }],
    interests: [
      { id: "int_7", label: "Hiking" },
      { id: "int_8", label: "Wine" },
      { id: "int_9", label: "Cinema" }
    ],
    profileDetails: {
      education: "Master's in Business Administration",
      drink: "Often",
      languages: "French, Spanish, English",
      marijuana: "No",
      smoke: "No",
      bio: "Wine enthusiast and film buff. Always up for a hike in the Pyrenees."
    }
  },
  {
    id: "luna_m",
    userName: "Luna",
    userSurName: "Martin",
    userNick: "LunaM",
    email: "test@gmail.com",
    password: "Test!123",
    avatarUrl: null,
    city: "Barcelona",
    country: "Spain",
    isOnline: true,
    hasStory: false,
    isUnseen: false,
    following: [{ userId: "erch" }, { userId: "kai_d" }, { userId: "sofia_r" }],
    followers: [{ userId: "ver_c" }, { userId: "kai_d" }, { userId: "sofia_r" }],
    interests: [
      { id: "int_10", label: "Yoga" },
      { id: "int_11", label: "Beach" },
      { id: "int_12", label: "Vegan Food" }
    ],
    profileDetails: {
      education: "Bachelor of Fine Arts",
      drink: "Never",
      languages: "Spanish, Catalan, English",
      marijuana: "No",
      smoke: "No",
      bio: "Yoga instructor and beach lover. Plant-based life since 2019."
    }
  },
  {
    id: "kai_d",
    userName: "Kai",
    userSurName: "Dubois",
    userNick: "KaiD",
    email: "test@gmail.com",
    password: "Test!123",
    avatarUrl: null,
    city: "Lyon",
    country: "France",
    isOnline: true,
    hasStory: true,
    isUnseen: true,
    following: [{ userId: "erch" }, { userId: "luna_m" }],
    followers: [{ userId: "luna_m" }, { userId: "sofia_r" }],
    interests: [
      { id: "int_13", label: "Climbing" },
      { id: "int_14", label: "Techno" },
      { id: "int_15", label: "Skateboarding" }
    ],
    profileDetails: {
      education: "Bachelor of Computer Science",
      drink: "Sometimes",
      languages: "French, English",
      marijuana: "Occasionally",
      smoke: "No",
      bio: "Code by day, climb by night. Always chasing the next techno festival."
    }
  },
  {
    id: "sofia_r",
    userName: "Sofia",
    userSurName: "Reyes",
    userNick: "SofiaR",
    email: "test@gmail.com",
    password: "Test!123",
    avatarUrl: null,
    city: "Mexico City",
    country: "Mexico",
    isOnline: true,
    hasStory: false,
    isUnseen: false,
    following: [{ userId: "r_c" }, { userId: "luna_m" }],
    followers: [{ userId: "r_c" }, { userId: "luna_m" }, { userId: "kai_d" }],
    interests: [
      { id: "int_16", label: "Dancing" },
      { id: "int_17", label: "Salsa" },
      { id: "int_18", label: "Street Food" }
    ],
    profileDetails: {
      education: "Bachelor of Psychology",
      drink: "Socially",
      languages: "Spanish, English",
      marijuana: "No",
      smoke: "No",
      bio: "Salsa dancer and street food explorer. Looking for dance partners and taco recommendations."
    }
  }
];