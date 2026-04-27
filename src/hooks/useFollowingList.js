// hooks/useFollowingList.js
import { useMemo } from 'react';
import { useCurrentUser, useUsers, } from '../hooks/useUsers.js'; // using useUser for precision

export function useFollowingList() {
    const { data: currentUser } = useCurrentUser();
    const { data: allUsers = [] } = useUsers();
    console.log('users', currentUser)
    const users = useMemo(() => {
        const followingIds = currentUser?.following?.map(f => f.userId) || [];
        return followingIds
            .map(id => allUsers.find(u => u.id === id))
            .filter(Boolean);
    }, [currentUser, allUsers]);

    return { users };
}