export function getStatsFormat(counter) {
    if (counter >= 1000000) return `${(counter / 1000000).toFixed(1)}M`;
    if (counter >= 1000) return `${(counter / 1000).toFixed(1)}k`;
    return counter.toString();
}

export function getMetaDataFormat(category) {
    return category.toUpperCase();
}