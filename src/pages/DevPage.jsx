// pages/DevPage.jsx
import { Globe, Users } from "lucide-react";
import { SelectButton } from "../components/ui/selectButton/SelectButton.jsx"
import { StoriesBar } from "../components/organisms/storiesBar/StoriesBar.jsx"
import { PostFeed } from "../components/organisms/postFeed/PostFeed.jsx"
import { useCurrentUser } from '../hooks/useCurrentUser.js'
import { usePosts } from "../hooks/usePosts.js"
import { useFollowingList } from "../hooks/useFollowingList.js"


export function DevPage() {
    const { currentUser } = useCurrentUser();
    const { users, handleStorySeen } = useFollowingList();
    const selectOptions = [
        { value: "public", label: "Public", icon: <Globe /> },
        { value: "friends", label: "Best friends", icon: <Users /> }
    ];
    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <StoriesBar
                currentUser={currentUser}
                users={users}
                onStorySeen={handleStorySeen}
            />

            <SelectButton
                label="Privacy"
                options={selectOptions}
                onChange={(value) => console.log(value)}
            />
        </div>
    )
}