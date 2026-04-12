/*StoriesBar.jsx*/
import { Avatar } from '../../ui/avatar/Avatar.jsx'
import { UserStory } from '../../molecules/userStory/UserStory.jsx'
import { RoundButton } from '../../ui/roundButton/RoundButton.jsx'
import './StoriesBar.css'

export function StoriesBar({ currentUser, users, onStorySeen }) {
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
                            <RoundButton className='stories-bar__add-story' showStory={true} />}
                    />
                    <p className='user-story__user-name'>My Story</p>
                </li>
                {users.map((user) => (
                    <li key={user.id}>
                        <UserStory
                            user={user}
                            hasStory={user.hasStory}
                            isUnseen={user.isUnseen}
                            avatarSize="lg"
                            onSeen={() => onStorySeen(user.id)}
                        /></li>
                ))}
            </ul>
        </div>
    )
}