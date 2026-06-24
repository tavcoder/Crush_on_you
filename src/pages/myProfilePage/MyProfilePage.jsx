// pages/myProfilePage/MyProfilePage.jsx
import { ErrorFallback } from '../../components/ui/feedback/ErrorFallback.jsx';
import { useOutletContext } from "react-router";
import { ProfileForm } from '../../components/organisms/profileForm/ProfileForm.jsx';
import './MyProfilePage.css';

export default function MyProfilePage() {
    const { currentUser, currentUserError, isSearching, isSearchLoading, searchingError } = useOutletContext();
    const displayLoading = isSearching || isSearchLoading
    const displayError = currentUserError ? currentUserError : searchingError
    if (!currentUser) return null
    if (displayLoading) return;
    if (displayError) return <ErrorFallback error={displayError} />;

    return (
        <section className="my-profile-page" aria-labelledby="edit-profile-title">
            <h1 id="edit-profile-title">Edit Profile</h1>
            <ProfileForm user={currentUser} />
        </section>
    );
}