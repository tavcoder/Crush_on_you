// components/organisms/profileForm/ProfileForm.jsx
import { SelectButton } from '../../ui/selectButton/SelectButton'
import { InterestList } from '../../molecules/interestList/InterestList.jsx';
import { Button } from '../../ui/button/Button.jsx';
import { useProfileForm } from '../../../hooks/useProfileForm.js';
import { interestOptions } from '../../../utils/insterestOptions.js';
import './ProfileForm.css';

const selectOptions = [
    { value: "sometimes", label: "Sometimes", icon: undefined },
    { value: "social", label: "Social", icon: undefined },
    { value: "never", label: "Never", icon: undefined }
];

export function ProfileForm({ user }) {
    const {
        formData,
        errors,
        isSubmitting,
        isValid,
        handleCancel,
        handleChange,
        handleBlur,
        handleSubmit,
        errorMessage,


    } = useProfileForm(user);

    const handleInterestToggle = (value) => {
        const currentInterests = formData.interests || [];
        const alreadySelected = currentInterests.includes(value);

        const newInterests = alreadySelected
            ? currentInterests.filter(i => i !== value)
            : [...currentInterests, value];

        // Simular evento para handleChange del hook
        handleChange({
            target: { name: 'interests', value: newInterests }
        });
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit} noValidate>

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
                <label className="field__label" htmlFor="profile-language">Languages</label>
                <input
                    className="field__input"
                    type="text"
                    id="profile-language"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.languages}
                    aria-describedby={errors.languages ? 'languages-error' : undefined}
                />
                {errors.languages && (
                    <p id="languages-error" className="field__error" role="alert">
                        {errors.languages}
                    </p>
                )}
            </div>

            <div className="field profile-form__field profile-form__field--tall">
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
                <span className="field__label">Interests (max. 8)</span>
                <InterestList
                    options={interestOptions}
                    selectedValues={formData.interests || []}
                    onToggle={handleInterestToggle}
                    maxSelection={8}
                />
            </div>

            <div className="profile-form__actions">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Profile'}
                </Button>
                {errorMessage && <span role='alert' className='field__error'>{errorMessage}</span>}
            </div>
        </form>
    );
}