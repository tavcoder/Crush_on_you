
/*avatarUtils.js*/
export function getColorVariant(userId, isCurrentUser) {
    if (!isCurrentUser) return null;
    const modifierList = ["blue", "yellow", "green"];
    if (isCurrentUser) {
        return "rose";
    } else {
        const modifierIndex = userId
            .split("")
            .reduce((sum, char) => sum + char.charCodeAt(0), 0) % modifierList.length;
        return modifierList[modifierIndex];
    }
}

export function getUsersInitials(userName, userSurName) {
    if (!userName) return null;
    return (userName[0] + userSurName[0]).toUpperCase();
}