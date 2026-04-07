
/*avatarUtils.js*/
export function getColorVariant(userId, currentUserId) {
    const modifierList = ["blue", "yellow", "green"];
    if (userId === currentUserId) {
        return "rose";
    } else {
        const modifierIndex = userId
            .split("")
            .reduce((sum, char) => sum + char.charCodeAt(0), 0) % modifierList.length;
        return modifierList[modifierIndex];
    }
}

export function getUsersInitials(userName, userSurName) {
    return (userName[0] + userSurName[0]).toUpperCase();
}