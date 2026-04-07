// hooks/useCurrentUser.js
import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext";

export function useCurrentUser() {
    const context = useContext(UserAuthContext);
    if (!context) throw new Error("useCurrentUser debe usarse dentro de UserAuthProvider");
    return context;
}