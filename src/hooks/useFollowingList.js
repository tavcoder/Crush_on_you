import { useCurrentUser } from '../hooks/useCurrentUser.js'
import { usersData } from "../services/mocks/users.mock.js"

export function useFollowingList() {
    const { currentUser } = useCurrentUser();

    return currentUser.following.map(f =>
        usersData.find(user => user.id === f.userId)
    );
}