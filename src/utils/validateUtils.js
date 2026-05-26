//validateUtils.jsx
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function validateFile(file) {

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return "Only JPG, PNG, GIF, WebP allowed";
    }

    if (file.size > MAX_FILE_SIZE) {
        return "Max 5MB per image";
    }

    return null;
}