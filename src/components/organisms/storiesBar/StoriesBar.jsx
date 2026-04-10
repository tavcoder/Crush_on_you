import { Avatar } from '../../ui/avatar/Avatar.jsx'
import './StoriesBar.css'

export function StoriesBar({ currentUser, users }) {
    if (!users?.length) return null;
    return (
        <div className='stories-bar'>
            <Avatar
                user={currentUser}
            />
            
            <ul className='stories-bar__users'>
                {users.map((user) => (
                    <li key={user.id} className='stories-bar__item'>
                        <Avatar
                            user={user}
                            showStory={true}
                            avatarSize="md" />
                    </li>
                ))}
            </ul>
        </div>
    )
}