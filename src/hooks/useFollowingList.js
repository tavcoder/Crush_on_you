// hooks/useFollowingList.js
import { useMemo } from 'react';
import { useCurrentUser, useUsers } from './useUsers.js';

export function useFollowingList() {
    const { data: currentUser, isLoading: isLoadingCurrent } = useCurrentUser();
    const { data: allUsers = [], isLoading: isLoadingAll } = useUsers();

    const users = useMemo(() => {
        const followingIds = currentUser?.following?.map(f => f.userId) || [];
        return followingIds
            .map(id => allUsers.find(u => u.id === id))
            .filter(Boolean);
    }, [currentUser, allUsers]);
    return {
        users,
        isLoading: isLoadingCurrent || isLoadingAll,
        count: users.length
    };
}