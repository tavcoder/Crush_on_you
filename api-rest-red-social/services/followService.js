// services/followService.js
const Follow = require("../models/follow");

const followUserIds = async (userId) => {
    try {
        // Limpiar registros huérfanos antes de hacer consultas
        await Follow.deleteMany({ $or: [{ followed: null }, { user: null }] });

        // Obtener documentos donde el usuario sigue a otros
        let followingDocs = await Follow.find({ user: userId })
            .select({ followed: 1, _id: 0 })
            .lean();

        // Obtener documentos donde el usuario es seguido por otros
        let followersDocs = await Follow.find({ followed: userId })
            .select({ user: 1, _id: 0 })
            .lean();

        // Extraer IDs y filtrar valores vacíos
        let following = followingDocs
            .map(f => f.followed)
            .filter(Boolean) // Elimina null, undefined, ""
            .map(f => f.toString());

        let followers = followersDocs
            .map(f => f.user)
            .filter(Boolean)
            .map(f => f.toString());

        return {
            following,
            followers
        };

    } catch (err) {
        console.error("Error en followUserIds:", err);
        return { following: [], followers: [] };
    }
};

module.exports = {
    followUserIds
};
