// hooks/useAuthForm.js
import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { UserAuthContext } from '../context/UserAuthContext';
import { loginUser, registerUser } from '../services/api/users.api';
import { useForm } from './useForm';
import { fieldValidators } from '../utils/validateUtils';

const FORM_CONFIG = {
    login: {
        initialValues: { email: '', password: '' },
        validators: {
            email: fieldValidators.email,
            password: fieldValidators.password
        }
    },
    register: {
        initialValues: { email: '', password: '', name: '', surname: '', nick: '' },
        validators: {
            email: fieldValidators.email,
            password: fieldValidators.password,
            name: fieldValidators.nameOrSurname,
            surname: fieldValidators.nameOrSurname,
            nick: fieldValidators.nick
        }
    }
};

export function useAuthForm(mode = 'login') { // 'login' | 'register'
    const { login: authLogin } = useContext(UserAuthContext);
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (formData) => {

        if (mode === 'login') {
            const { token, userId } = await loginUser(formData)
            await authLogin(token, userId)
            navigate('/feed')
        } else {
            await registerUser(formData)
            const { token, userId } = await loginUser(formData)
            await authLogin(token, userId)
            navigate('/profile')
        }

    }, [mode, authLogin, navigate])

    const { initialValues, validators } = FORM_CONFIG[mode];
    const form = useForm({ initialValues, validators, onSubmit: handleSubmit });
    return { ...form };
}
