// pages/LoginPage/LoginPage.jsx

import { Link } from 'react-router';
import { LoginForm } from '../../components/molecules/loginForm/LoginForm.jsx';
import { BrandLogo } from '../../components/ui/brandLogo/BrandLogo.jsx';
import { PageFooter } from '../../components/ui/pageFooter/PageFooter.jsx';
import './LoginPage.css'

export function LoginPage() {
    return (
        <main className="login-page">
            <BrandLogo size="xl" asLink={false} />
            <div className="card login-card">
                <h1 className='login-card__title'>Welcome back</h1>
                <p className='login-card__text'>Log in to continue meeting special people.</p>
                <LoginForm />
                <div className='login-card__register'>
                    <p className='login-card__register-text'>Don't have an account? </p>
                    <Link className='login-card__register-link' to="/register">Sign up for free.</Link></div>

            </div>
            <PageFooter />

        </main>
    )
}