// hooks/useFollowingList.js
import { useMemo } from 'react';
import { useCurrentUser, useUsers } from './useUsers.js';

export function useFollowingList() {
    const { data: currentUser, isLoading: isLoadingCurrent } = useCurrentUser();
    console.log('following current',currentUser)

    const { data: usersResponse, isLoading: isLoadingAll } = useUsers();
    console.log('following', usersResponse)

    const users = useMemo(() => {
        const followingIds = currentUser?.following?.map(f => f.userId) ?? [];
        return followingIds
            .map(id => usersResponse.find(u => u.id === id))
            .filter(Boolean);
    }, [currentUser, usersResponse]);

    return {
        users,
        isLoading: isLoadingCurrent || isLoadingAll,
        count: users.length
    };
}