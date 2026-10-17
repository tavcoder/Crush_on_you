/*useViewedUserProfile.js*/
import { useParams } from "react-router";
import { useUser } from "./useUsers.js";

/**
 * Resuelve qué perfil se está viendo en la rama de rutas activa: el usuario
 * logueado (sin :userId en la URL, ej. /timeline, /feed) o un tercero
 * (:userId presente, ej. /timeline/:userId). La URL es la única fuente de
 * verdad — no depende de estado en memoria ni de la ruta exacta donde se
 * invoque el hook (useParams devuelve los params de toda la rama activa).
 *
 * @param {import('../services/contracts/types.js').User | undefined} currentUser
 * @returns {{
 *   viewedUser: import('../services/contracts/types.js').User | undefined,
 *   isOwnProfile: boolean,
 *   isLoading: boolean,
 *   error: unknown,
 * }}
 */
export function useViewedUserProfile(currentUser) {
    const { userId } = useParams();
    const isOwnProfile = !userId || userId === currentUser?.id;

    // Solo se pide por red si es un perfil ajeno — el propio ya está
    // completo en memoria vía UserAuthContext.
    const { data: fetchedUser, isLoading, error } = useUser(!isOwnProfile ? userId : undefined);

    return {
        viewedUser: isOwnProfile ? currentUser : fetchedUser,
        isOwnProfile,
        isLoading: isOwnProfile ? false : isLoading,
        error: isOwnProfile ? undefined : error,
    };
}