// hooks/useCurrentUser.js
import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext";
import { usersData } from "../services/mocks/users.mock.js"

export function useCurrentUser() {
    const context = useContext(UserAuthContext);
    if (!context) throw new Error("useCurrentUser debe usarse dentro de UserAuthProvider");
    const currentUserData = usersData.find(
        user => user.id === context.currentUser.id
    );
    return { currentUser: currentUserData };
}