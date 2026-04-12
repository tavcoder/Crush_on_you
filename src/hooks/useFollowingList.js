import { useState } from 'react';
import { useCurrentUser } from './useCurrentUser.js';
import { usersData } from '../services/mocks/users.mock.js';

export function useFollowingList() {
    const { currentUser } = useCurrentUser();

    // construyes la lista inicial igual que antes
    const initialUsers = currentUser.following.map(f =>
        usersData.find(user => user.id === f.userId)
    );

    const [users, setUsers] = useState(initialUsers);

    function handleStorySeen(userId) {
        setUsers(prev =>
            prev.map(user =>
                user.id === userId
                    ? { ...user, isUnseen: false }
                    : user
            )
        );
        // aquí irá la llamada a la API cuando tengas el endpoint
    }

    return { users, handleStorySeen };
}