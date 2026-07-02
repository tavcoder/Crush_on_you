// pages/LoginPage/LoginPage.jsx

import { Link } from 'react-router';
import { AuthForm } from '../../components/molecules/authForm/AuthForm.jsx';
import { BrandLogo } from '../../components/ui/brandLogo/BrandLogo.jsx';
import { PageFooter } from '../../components/ui/pageFooter/PageFooter.jsx';
import './AuthPage.css'

export function LoginPage() {
    return (
        <main className="auth-page">
            <BrandLogo size="xl" asLink={false} />
            <div className="card auth-card">
                <h1 className='auth-card__title'>Welcome back</h1>
                <p className='auth-card__text'>Log in to continue meeting special people.</p>
                <AuthForm mode='login' />
                <div className='auth-card__register'>
                    <p className='auth-card__register-text'>Don't have an account? </p>
                    <Link className='auth-card__register-link' to="/register">Sign up for free.</Link></div>

            </div>
            <PageFooter />

        </main>
    )
}