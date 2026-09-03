//AuthForm.jsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthForm } from '../../../hooks/useAuthForm';
import { Button } from '../../ui/button/Button';
import { IconButton } from '../../ui/iconButton/IconButton';
import './AuthForm.css'
export function AuthForm({ mode }) {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);// TODO: Implementar la funcionalidad "rememberMe"
    // - Añadir el parámetro rememberMe a authLogin()
    // - Usar localStorage para almacenamiento persistente y sessionStorage para la sesión actual
    // - Actualizar UserAuthContext para manejar la preferencia de almacenamiento

    const {
        formData,
        errors,
        isSubmitting,
        submitError,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit
    } = useAuthForm(mode);
    return (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {mode === 'register' &&
                <div className="field auth-form__field">
                    <label className='field__label' htmlFor="auth-name">Name:</label>
                    <input
                        className="field__input"
                        type="name"
                        id="auth-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                        <p id="name-error" className="field__error auth-form__error" role="alert">
                            {errors.name}
                        </p>
                    )}
                    <label className='field__label' htmlFor="auth-surname">Surname:</label>
                    <input
                        className="field__input"
                        type="surname"
                        id="auth-surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.surname}
                        aria-describedby={errors.surname ? 'surname-error' : undefined}
                    />
                    {errors.name && (
                        <p id="name-error" className="field__error auth-form__error" role="alert">
                            {errors.name}
                        </p>
                    )}
                    <label className='field__label' htmlFor="auth-nick">Nick:</label>
                    <input
                        className="field__input"
                        type="nick"
                        id="auth-nick"
                        name="nick"
                        value={formData.nick}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.nick}
                        aria-describedby={errors.nick ? 'nick-error' : undefined}
                    />
                    {errors.nick && (
                        <p id="nick-error" className="field__error auth-form__error" role="alert">
                            {errors.nick}
                        </p>
                    )}
                </div>
            }
            <div className="field auth-form__field">
                <label className='field__label' htmlFor="auth-email">Email:</label>
                <input
                    className="field__input"
                    type="email"
                    id="auth-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                    <p id="email-error" className="field__error auth-form__error" role="alert">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="field auth-form__field">
                <label className='field__label' htmlFor="auth-password">Password:</label>
                <div className="auth-form__password-wrapper">
                    <input
                        className="field__input"
                        type={showPassword ? 'text' : 'password'}
                        id="auth-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button
                        className="btn-reset password-wrapper__icon"
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >{showPassword ? <EyeOff /> : <Eye />}</button>
                </div>
                {errors.password && (
                    <p id="password-error" className="field__error auth-form__error" role="alert">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="auth-form__options">
                <label className="auth-form__remember">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(prev => !prev)}
                    />
                    Remember me
                </label>

                <IconButton
                    type="button"
                    className="auth-form__forgot"
                    disabled
                    tooltip="Forgot password coming soon"
                >
                    Forgot password?
                </IconButton>
            </div>

            <Button
                type="submit"
                className="auth-form__submit"
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? 'Logging in...' : mode === 'register' ? 'Sign up' : 'Log in'}
            </Button>

            {submitError && (
                <p className="auth-form__server-error" role="alert">
                    {submitError}
                </p>
            )}

            <div className="auth-form__divider">
                <span>or</span>
            </div>

            <Button
                type="button"
                className="auth-form__google"
                disabled
                tooltip="auth with Google coming soon"
            >
                {mode === 'register' ? 'Sign up with Google' : 'Log in with Google'}
            </Button>

        </form>

    );
}