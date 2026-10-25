// components/organisms/createPost/CreatePostDialog.jsx
import { Modal } from '../../ui/overlay/Modal.jsx'
import { CreatePost } from './CreatePost.jsx'

export function CreatePostDialog({ isOpen, onClose, triggerRef, user, onPostCreated, isSubmitting }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            triggerRef={triggerRef}
            title="New post"
            closeOnOutsideClick={false}
            className="modal--wide"
        >
            <CreatePost
                user={user}
                onPostCreated={onPostCreated}
                isSubmitting={isSubmitting}
                autoFocus
            />
        </Modal>
    )
}