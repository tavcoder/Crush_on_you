// pages/RegisterPage/RegisterPage.jsx

import { Link } from 'react-router';
import { AuthForm } from '../../components/molecules/authForm/AuthForm.jsx';
import { BrandLogo } from '../../components/ui/brandLogo/BrandLogo.jsx';
import { PageFooter } from '../../components/ui/pageFooter/PageFooter.jsx';
import './AuthPage.css'

export function RegisterPage() {
    return (
        <main className="auth-page">
            <BrandLogo size="xl" asLink={false} />
            <div className="card auth-card">
                <h1 className='auth-card__title'>Welcome</h1>
                <p className='auth-card__text'>Sign up to meet amazing people.</p>
                <AuthForm mode='register' />
                <div className='auth-card__register'>
                    <p className='auth-card__register-text'>Already have an account? </p>
                    <Link className='auth-card__register-link' to="/">Log in.</Link></div>

            </div>
            <PageFooter />

        </main>
    )
}