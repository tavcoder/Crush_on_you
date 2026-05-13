import { useEffect, useState } from 'react';
import { useCurrentUser, useUsers } from './useUsers.js';

export function useFollowingList() {
    const { data: currentUser, isLoading: isLoadingCurrent } = useCurrentUser();
    const { data: usersResponse, isLoading: isLoadingAll } = useUsers();

    const allUsersArray = usersResponse?.data ?? [];

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const followingIds = currentUser?.following?.map(f => f.userId) ?? [];

        const followingUsers = followingIds
            .map(id => allUsersArray.find(u => u.id === id))
            .filter(Boolean);

        setUsers(followingUsers);
    }, [currentUser, allUsersArray]);

    function onStorySeen(userId) {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId
                    ? { ...user, isUnseen: false }
                    : user
            )
        );
    }

    return {
        users,
        onStorySeen,
        isLoading: isLoadingCurrent || isLoadingAll,
        count: users.length
    };
}