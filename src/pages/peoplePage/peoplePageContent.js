// peoplePageContent.js
import { PEOPLE_TYPES_CONFIG } from "./peopleTypes.js";

function resolve(entry, userNick) {
    return typeof entry === 'function' ? entry(userNick) : entry;
}

export function getPeoplePageTitle(type, isOwnProfile, userNick) {
    const entry = PEOPLE_TYPES_CONFIG[type].title[isOwnProfile ? 'own' : 'other'];
    return resolve(entry, userNick);
}

export function getPeoplePageEmptyMessage(type, isOwnProfile, userNick) {
    const entry = PEOPLE_TYPES_CONFIG[type].emptyMessage[isOwnProfile ? 'own' : 'other'];
    return resolve(entry, userNick);
}