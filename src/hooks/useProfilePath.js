/*useProfilePath.js*/
import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext.jsx";
import { getTimelinePath } from "../utils/routeUtils.js";

/**
 * Devuelve una función que construye la ruta del timeline de un usuario.
 * '/timeline' si es el usuario logueado, '/timeline/:id' si es otro.
 * @returns {(user: {id: string}) => string | undefined}
 */
export function useProfilePath() {
    const { currentUser } = useContext(UserAuthContext);

    return (user) => {
        if (!user?.id) return undefined; // TODO: [DEUDA TÉCNICA] no debería ocurrir con datos bien formados; evaluar log si aparece en producción
        return getTimelinePath(user.id === currentUser?.id ? undefined : user.id);
    };
}