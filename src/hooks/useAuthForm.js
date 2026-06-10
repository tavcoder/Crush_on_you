// hooks/useAuthForm.js
import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { UserAuthContext } from '../context/UserAuthContext';
import { loginUser } from '../services/api/users.api';
import { useForm } from './useForm';
import { fieldValidators } from '../utils/validateUtils';

export function useAuthForm(mode = 'login') { // 'login' | 'register'
    const { login: authLogin } = useContext(UserAuthContext);
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (formData) => {
        const token = mode === 'login'
            ? await loginUser(formData)
            : await registerUser(formData);// TODO: importar registerUser cuando esté implementado en users.api.js

        authLogin(token);
        navigate('/feed');
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