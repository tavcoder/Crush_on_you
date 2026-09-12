// PeoplePage/peopleTypes.js
export const PEOPLE_TYPES_CONFIG = {
    suggestions: {
        title: { own: "Suggested for you", other: null },
        emptyMessage: {
            own: "No suggestions available right now.",
            other: null,
        },
    },
    followers: {
        title: {
            own: "Your followers",
            other: (userNick) => `${userNick || 'This user'}'s followers`,
        },
        emptyMessage: {
            own: "No followers yet. Explore users!",
            other: (userNick) => `${userNick || 'This user'} has no followers yet.`,
        },
    },
    following: {
        title: {
            own: "Following",
            other: (userNick) => `${userNick || 'This user'} is following`,
        },
        emptyMessage: {
            own: "You're not following anyone yet.",
            other: (userNick) => `${userNick || 'This user'} isn't following anyone yet.`,
        },
    },
};

export const PEOPLE_TYPES = Object.keys(PEOPLE_TYPES_CONFIG);

export function isValidPeopleType(type) {
    return PEOPLE_TYPES.includes(type);
}