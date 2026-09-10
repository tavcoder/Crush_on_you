/*peoplePageContent.js */
export function getPeoplePageTitle(type, isOwnProfile, userNick) {
    const PAGE_TITLES = {
        suggestions: {
            own: "Suggested for you",
            other: null,
        },
        followers: {
            own: "Your followers",
            other: `${userNick || 'This user'}'s followers`,
        },
        following: {
            own: "Following",
            other: `${userNick || 'This user'} is following`,
        },
    }
    return PAGE_TITLES[type][isOwnProfile ? 'own' : 'other'];
};

export function getPeoplePageEmptyMessage(type, isOwnProfile, userNick) {
    const EMPTY_MESSAGES = {

        suggestions: {
            own: "No suggestions available right now.",
            other: null,
        },
        followers: {
            own: "No followers yet. Explore users!",
            other: `${userNick || 'This user'} has no followers yet.`,
        },
        following: {
            own: "You're not following anyone yet.",
            other: `${userNick || 'This user'} isn't following anyone yet.`,
        },
    }
    return EMPTY_MESSAGES[type][isOwnProfile ? 'own' : 'other'];
};  