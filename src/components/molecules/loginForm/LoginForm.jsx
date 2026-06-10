//LoginForm.jsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthForm } from '../../../hooks/useAuthForm';
import { Button } from '../../ui/button/Button';
import { IconButton } from '../../ui/iconButton/IconButton';
import './LoginForm.css'
export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const {
        formData,
        errors,
        isSubmitting,
        submitError,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit
    } = useAuthForm('login');
    return (
        <form className="login-form" onSubmit={handleSubmit} noValidate>

            <div className="field login-form__field">
                <label className='field__label' htmlFor="login-email">Email:</label>
                <input
                    className="field__input"
                    type="email"
                    id="login-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                    <p id="email-error" className="field__error login-form__error" role="alert">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="field login-form__field">
                <label className='field__label' htmlFor="login-password">Password:</label>
                <div className="login-form__password-wrapper">
                    <input
                        className="field__input"
                        type={showPassword ? 'text' : 'password'}
                        id="login-password"
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
                    <p id="password-error" className="field__error login-form__error" role="alert">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="login-form__options">
                <label className="login-form__remember">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(prev => !prev)}
                    />
                    Remember me
                </label>

                <IconButton
                    type="button"
                    className="login-form__forgot"
                    disabled
                    tooltip="Forgot password coming soon"
                >
                    Forgot password?
                </IconButton>
            </div>

            <Button
                type="submit"
                className="login-form__submit"
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>

            {submitError && (
                <p className="login-form__server-error" role="alert">
                    {submitError}
                </p>
            )}

            <div className="login-form__divider">
                <span>or</span>
            </div>

            <Button
                type="button"
                className="login-form__google"
                disabled
                tooltip="Login with Google coming soon"
            >
                Login with Google
            </Button>

        </form>

    );
}