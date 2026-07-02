/* formatUtils.js */

// === User Formatting ===
// util interno — no se exporta
function joinIfPresent(a, b, separator = ", ") {
    if (!a && !b) return null
    if (!a) return b
    if (!b) return a
    return `${a}${separator}${b}`
}

export function getUserFullNameFormat(user) {
    return joinIfPresent(user?.userName, user?.userSurName, " ")
}

export function getUserLocationFormat(user) {
    return joinIfPresent(user?.city, user?.country)
}

// === Number Formatting ===
export function getStatsFormat(n) {
    if (!n || n < 1000) return n ?? 0
    if (n < 1000000) return `${(n / 1000).toFixed(1)}k`
    return `${(n / 1000000).toFixed(1)}M`
}

// === Metadata Formatting ===
export function getMetadataFormat(category) {
    return category?.toUpperCase() ?? "";
}

// === Date Formatting ===
export function getDateFormat(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const parts = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).formatToParts(date);

    const get = (type) => parts.find(p => p.type === type)?.value;

    return `${get("day")} ${get("month")}. at ${get("hour")}:${get("minute")} ${get("dayPeriod")}`;
}

export function getFollowedByFormat(followerMatch) {
    if (!followerMatch) return "Suggested for you"
    return `Followed by ${getUserFullNameFormat(followerMatch)}`
}