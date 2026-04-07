import { createContext, useState } from "react";
import { mockCurrentUserId } from '../services/mocks/mockCurrentUserId.js'


export const UserAuthContext = createContext(null);

export function UserAuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({ id: mockCurrentUserId });

    function login(userData) { setCurrentUser(userData); }
    function logout() { setCurrentUser(null); }

    return (
        <UserAuthContext value={{ currentUser, login, logout }}>
            {children}
        </UserAuthContext>
    );
}