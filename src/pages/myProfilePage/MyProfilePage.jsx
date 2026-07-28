// pages/myProfilePage/MyProfilePage.jsx
import { useOutletContext } from "react-router";
import { ErrorFallback } from '../../components/ui/feedback/ErrorFallback.jsx';
import { LoadingFallback } from '../../components/ui/feedback/LoadingFallback.jsx';
import { AvatarUploader } from '../../components/molecules/avatarUploader/AvatarUploader.jsx';
import { ProfileForm } from '../../components/organisms/profileForm/ProfileForm.jsx';
import './MyProfilePage.css';

export default function MyProfilePage() {
    const { currentUser, currentUserError, isSearching, isSearchLoading, searchingError } = useOutletContext();
    const displayLoading = isSearching || isSearchLoading
    const displayError = currentUserError ? currentUserError : searchingError

    if (displayError) return <ErrorFallback error={displayError} />
    if (displayLoading || !currentUser) return <LoadingFallback />

    return (
        <section className="card my-profile-page" aria-labelledby="edit-profile-title">
            <h1 id="edit-profile-title">Edit Profile</h1>
            <AvatarUploader
                avatarUrl={currentUser.avatarUrl}
                userName={currentUser.userName}
                userSurName={currentUser.userSurName}
            />
            <ProfileForm user={currentUser} />
        </section>
    );
}