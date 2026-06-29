import { useRef } from 'react'
import { Avatar } from '../../ui/avatar/Avatar'
import { IconButton } from '../../ui/iconButton/IconButton'
import { SkeletonBase } from '../../ui/skeletons/SkeletonBase.jsx'
import { useAvatarUploader } from '../../../hooks/useAvatarUploader.js'
import './AvatarUploader.css'

/**
 * @param {string} props.userId
 * @param {string} props.userName
 * @param {string} props.userSurName
 * @param {string} props.avatarUrl
 */
export function AvatarUploader({ userId, userName, userSurName, avatarUrl }) {
    const inputRef = useRef(null)
    const { avatarPreview, isLoading, error, isError, handleAvatarUpload } = useAvatarUploader(userId)

    return (
        <div className='my-profile-page__avatar-uploader'>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleAvatarUpload(e.target.files[0])}
            />

            {isLoading ? <SkeletonBase variant="avatar" />

                : <Avatar
                    user={{
                        avatarUrl: avatarPreview || avatarUrl,
                        userName: userName,
                        userSurName: userSurName
                    }}
                    avatarSize='xl'
                    isCurrentUser={true}
                    alt={userName}
                />}

            {isError && <span role="alert" className='field__error'>{error?.message ?? 'Failed to upload the image'}</span>}

            <IconButton
                onClick={() => inputRef.current.click()}
            >
                Upload avatar
            </IconButton>

        </div>

    )
}