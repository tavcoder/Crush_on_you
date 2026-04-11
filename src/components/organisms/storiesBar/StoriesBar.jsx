/*StoriesBar.jsx*/
import { Avatar } from '../../ui/avatar/Avatar.jsx'
import { UserStory } from '../../molecules/userStory/UserStory.jsx'
import { RoundButton } from '../../ui/roundButton/RoundButton.jsx'
import './StoriesBar.css'

export function StoriesBar({ currentUser, users }) {
    if (!users?.length) return null;
    return (
        <div className='stories-bar'>

            <ul className='stories-bar__list' role='list'>
                <li key={currentUser.id}>
                    <Avatar
                        user={currentUser}
                        isCurrentUser={true}
                        avatarSize={"lg"}
                        badge={
                            <RoundButton showStory={true} />}
                    /></li>
                {users.map((user) => (
                    <li key={user.id}>
                        <UserStory
                            user={user}
                            hasStory={true}
                            isUnseen={true}
                            avatarSize="lg"
                        /></li>
                ))}
            </ul>
        </div>
    )
}