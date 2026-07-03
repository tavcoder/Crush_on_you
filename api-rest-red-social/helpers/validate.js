const validator = require("validator");

const validate = (params) => {
    const errors = [];

    // Validación del nombre
    if (validator.isEmpty(params.name || "")) {
        errors.push("El nombre no puede estar vacío.");
    } else {
        if (!validator.isLength(params.name, { min: 3 })) {
            errors.push("El nombre debe tener al menos 3 caracteres.");
        }
        if (!validator.isAlpha(params.name, "es-ES")) {
            errors.push("El nombre solo debe contener letras.");
        }
    }

    // Validación del apellido
    if (validator.isEmpty(params.surname || "")) {
        errors.push("El apellido no puede estar vacío.");
    } else {
        if (!validator.isLength(params.surname, { min: 3 })) {
            errors.push("El apellido debe tener al menos 3 caracteres.");
        }
        if (!validator.isAlpha(params.surname, "es-ES")) {
            errors.push("El apellido solo debe contener letras.");
        }
    }

    // Validación del nick
    if (validator.isEmpty(params.nick || "")) {
        errors.push("El nick no puede estar vacío.");
    } else {
        if (!validator.isLength(params.nick, { min: 2 })) {
            errors.push("El nick debe tener al menos 2 caracteres.");
        }
    }

    // Validación del email
    if (validator.isEmpty(params.email || "")) {
        errors.push("El email no puede estar vacío.");
    } else if (!validator.isEmail(params.email)) {
        errors.push("El email no tiene un formato válido.");
    }

    // Validación de la contraseña
    if (validator.isEmpty(params.password || "")) {
        errors.push("La contraseña no puede estar vacía.");
    }

    // Validación opcional de la bio
    if (params.bio && !validator.isLength(params.bio, { max: 255 })) {
        errors.push("La biografía no puede tener más de 255 caracteres.");
    }

    // Si hay errores, lanzarlos
    if (errors.length > 0) {
        throw new Error("Errores de validación:\n" + errors.join("\n"));
    } else {
        console.log("validación superada");
    }
};

module.exports = validate;
