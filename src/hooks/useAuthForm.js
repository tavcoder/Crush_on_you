// hooks/useAuthForm.js
import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { UserAuthContext } from '../context/UserAuthContext';
import { loginUser, registerUser } from '../services/api/users.api';
import { useForm } from './useForm';
import { fieldValidators } from '../utils/validateUtils';

export function useAuthForm(mode = 'login') { // 'login' | 'register'
    const { login: authLogin } = useContext(UserAuthContext);
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (formData) => {
        if (mode === 'login') {
            const token = await loginUser(formData);
            await authLogin(token);
            navigate('/feed');
        } else {
            // Register: crear usuario, login, ir a completar perfil
            const token = await registerUser(formData);
            await authLogin(token);
            navigate('/profile/me');  // ← Completar perfil (avatar, bio, etc.)
        }
    }, [mode, authLogin, navigate]);

    const validators = mode === 'login'
        ? { email: fieldValidators.email, password: fieldValidators.password }
        : {
            email: fieldValidators.email,
            password: fieldValidators.password,
            name: fieldValidators.nameOrSurname,
            nick: fieldValidators.nick
        };

    const initialValues = mode === 'login'
        ? { email: '', password: '' }
        : { email: '', password: '', name: '', nick: '' };

    return useForm({
        initialValues,
        validators,
        onSubmit: handleSubmit
    });
}