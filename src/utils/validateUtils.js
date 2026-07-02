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

// Validadores individuales reutilizables
function toFieldError(errors) {
    return errors.length === 0 ? null : errors[0];
}

export const fieldValidators = {
    nameOrSurname: (value) => {
        const errors = [];
        const trimmed = value?.trim();
        if (!trimmed || trimmed.length < 3) {
            errors.push("Must be at least 3 characters");
        }
        if (trimmed && !/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmed)) {
            errors.push("Only letters and spaces allowed");
        }
        return toFieldError(errors);
    },

    nick: (value) => {
        const errors = [];
        const trimmed = value?.trim();
        if (!trimmed || trimmed.length < 2) {
            errors.push("Must be at least 2 characters");
        }
        if (trimmed && !/^[a-zA-Z0-9_]+$/.test(trimmed)) {
            errors.push("Only letters, numbers and underscores");
        }
        return toFieldError(errors);
    },

    email: (value) => {
        const errors = [];
        const trimmed = value?.trim();
        if (!trimmed) {
            errors.push("Email is required");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmed)) {
                errors.push("Invalid email format");
            }
        }
        return toFieldError(errors);
    },

    password: (value) => {
        const errors = [];

        if (!value || value.length < 8) {
            errors.push("The password must be at least 8 characters long.");
        }
        return toFieldError(errors);
    },

    bio: (value) => {
        const errors = [];
        if (value) { // Solo validar si tiene valor
            const trimmed = value.trim();
            if (trimmed.length > 255) {
                errors.push("Bio cannot exceed 255 characters");
            }
        }
        return toFieldError(errors);
    },

    post: (value) => {
        const errors = [];
        const trimmed = value?.trim();

        if (!trimmed) {
            errors.push("Post text is required");
        }

        return toFieldError(errors);
    },

    comment: (value) => {
        const errors = [];
        const trimmed = value?.trim();

        if (!trimmed) {
            errors.push("Comment text is required");
        }

        return toFieldError(errors);
    }
};

