/* formatUtils.js */

// === User Formatting ===
export function getUserFullName(user) {
    if (!user?.userName && !user?.userSurName) return "";
    return `${user.userName || ""} ${user.userSurName || ""}`.trim();
}

// === Number Formatting ===
export function getStatsFormat(counter) {
    if (counter >= 1000000) return `${(counter / 1000000).toFixed(1)}M`;
    if (counter >= 1000) return `${(counter / 1000).toFixed(1)}k`;
    return counter.toString();
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