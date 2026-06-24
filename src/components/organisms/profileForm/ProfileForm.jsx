// components/organisms/profileForm/ProfileForm.jsx
import { useNavigate } from "react-router"
import { Pencil, Coffee, Plane, Music, Book, Waves, Dumbbell } from "lucide-react";
import { SelectButton } from '../../ui/selectButton/SelectButton'
import { Avatar } from '../../ui/avatar/Avatar.jsx';
import { Button } from '../../ui/button/Button.jsx';
import { IconButton } from '../../ui/iconButton/IconButton.jsx';
import { useProfileForm } from '../../../hooks/useProfileForm.js';
import './ProfileForm.css';

const selectOptions = [
    { value: "sometimes", label: "Sometimes", icon: undefined },
    { value: "social", label: "Social", icon: undefined },
    { value: "never", label: "Never", icon: undefined }
];

const NAV_ITEMS = [
    { icon: Coffee, label: 'Coffee' },
    { icon: Plane, label: 'Plane' },
    { icon: Music, label: 'Music' },
    { icon: Book, label: 'Read' },
    { icon: Waves, label: 'Ocean' },
    { icon: Dumbbell, label: 'Worckout' },
];

export function ProfileForm({ user }) {
    const navigate = useNavigate()
    const {
        formData,
        errors,
        isSubmitting,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        handleInterestToggle,
    } = useProfileForm(user);

    return (
        <form className="card profile-form" onSubmit={handleSubmit} noValidate>
            <Avatar
                user={user}
                avatarSize='xl'
                isCurrentUser={true}
                alt={user.userName}
                badge={<IconButton
                    key="pencil"
                    icon={<Pencil />}
                    variant='outlined'
                    onClick={undefined}
                    className="avatar__edit-btn" />}
                className='profile-form__avatar' />
            <div className="field profile-form__field">
                <label className="field__label" htmlFor="profile-name">Name</label>
                <input
                    className="field__input"
                    type="text"
                    id="profile-name"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.userName}
                    aria-describedby={errors.userName ? 'name-error' : undefined}
                />
                {errors.userName && (
                    <p id="name-error" className="field__error" role="alert">
                        {errors.userName}
                    </p>
                )}
            </div>

            <div className="field profile-form__field">
                <label className="field__label" htmlFor="profile-surname">Surname</label>
                <input
                    className="field__input"
                    type="text"
                    id="profile-surname"
                    name="userSurName"
                    value={formData.userSurName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.userSurName}
                    aria-describedby={errors.userSurName ? 'surname-error' : undefined}
                />
                {errors.userSurName && (
                    <p id="surname-error" className="field__error" role="alert">
                        {errors.userSurName}
                    </p>
                )}
            </div>
            <div className="field profile-form__field">
                <label className="field__label" htmlFor="profile-nick">Nick</label>
                <input
                    className="field__input"
                    type="text"
                    id="profile-nick"
                    name="userNick"
                    value={formData.userNick}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.userNick}
                    aria-describedby={errors.userNick ? 'nick-error' : undefined}
                />
                {errors.userNick && (
                    <p id="nick-error" className="field__error" role="alert">
                        {errors.userNick}
                    </p>
                )}
            </div>
            <div className="field profile-form__field">
                <label className="field__label" htmlFor="profile-education">Education</label>
                <input
                    className="field__input"
                    type="text"
                    id="profile-education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.education}
                    aria-describedby={errors.education ? 'education-error' : undefined}
                />
                {errors.education && (
                    <p id="education-error" className="field__error" role="alert">
                        {errors.education}
                    </p>
                )}
            </div>
            <div className="field profile-form__field">
                <label className="field__label" htmlFor="profile-language">Language</label>
                <input
                    className="field__input"
                    type="text"
                    id="profile-language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.language}
                    aria-describedby={errors.language ? 'language-error' : undefined}
                />
                {errors.language && (
                    <p id="language-error" className="field__error" role="alert">
                        {errors.language}
                    </p>
                )}
            </div>

            <div className="field profile-form__field--tall">
                <label className="field__label" htmlFor="profile-bio">Bio</label>
                <textarea
                    className="field__input field__input--textarea "
                    id="profile-bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="4"
                    maxLength="255"
                    aria-invalid={!!errors.bio}
                    aria-describedby={errors.bio ? 'bio-error' : undefined}
                />
                {errors.bio && (
                    <p id="bio-error" className="field__error" role="alert">
                        {errors.bio}
                    </p>
                )}
                <span className="field__hint">{formData.bio.length}/255</span>
            </div>
            <div className="field profile-form__field">

                <label className="field__label" htmlFor="profile-city">City</label>
                <input
                    className="field__input"
                    type="text"
                    id="profile-city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            <div className="field profile-form__field">

                <label className="field__label" htmlFor="profile-country">Country</label>
                <input
                    className="field__input"
                    type="text"
                    id="profile-country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            <div className="field profile-form__stack">

                <SelectButton
                    name="drink"
                    label="Drink"
                    options={selectOptions}
                    value={formData.drink}
                    onChange={handleChange}
                    className="field__label"
                />

                <fieldset className=" profile-form__fieldset">
                    <legend className="field__label">Do you smoke?</legend>

                    <label className="field__radio" htmlFor="profile-smoke-yes">
                        <input
                            type="radio"
                            id="profile-smoke-yes"
                            name="smoke"
                            value="yes"
                            checked={formData.smoke === "yes"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        Yes
                    </label>

                    <label className="field__radio" htmlFor="profile-smoke-no">
                        <input
                            type="radio"
                            id="profile-smoke-no"
                            name="smoke"
                            value="no"
                            checked={formData.smoke === "no"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        No
                    </label>
                </fieldset>
            </div>
            <div className="profile-form__field--wide">
                <span className="field__label"> Interest</span>
                {NAV_ITEMS.map(({ icon: Icon, label }) => {
                    const isActive = formData.interest.includes(label);

                    return (
                        <IconButton
                            key={label}
                            icon={<Icon />}
                            ariaLabel={label}
                            direction="row"
                            isActive={isActive}
                            onClick={() => handleInterestToggle(label)}
                        >
                            {label}
                        </IconButton>
                    );
                })}
            </div>

            <div className="profile-form__actions">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Profile'}
                </Button>
            </div>
        </form>
    );
}