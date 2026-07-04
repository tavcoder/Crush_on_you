// hooks/useProfileForm.js
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { updateProfile } from '../services/api/users.api';
import { useForm } from './useForm';
import { fieldValidators } from '../utils/validateUtils';

export function useProfileForm(user) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = useCallback(async (formData) => {
        if (!user?.id) return
        try {
            await updateProfile(formData)
            navigate('/feed')
        } catch (error) {
            setErrorMessage(`An error occurred while updating the profile: ${error.message}`)
        }
    }, [user?.id, navigate])

    const handleCancel = () => navigate(-1);

    const validators = {
        userName: fieldValidators.nameOrSurname,
        userNick: fieldValidators.nick,
        bio: fieldValidators.bio,
    };

    const initialValues = useMemo(() => (
        {
            userName: user?.userName || '',
            userSurName: user?.userSurName || '',
            userNick: user?.userNick || '',
            email: user?.email || '',
            bio: user?.profileDetails?.bio || '',
            city: user?.city || '',
            country: user?.country || '',
            education: user?.profileDetails?.education || '',
            languages: user?.profileDetails?.languages || '',
            smoke: user?.profileDetails?.smoke || '',
            interests: user?.interests || [],
        }
    ), [user]);

    const form = useForm({ initialValues, validators, onSubmit: handleSubmit })

    return {
        ...form,
        errorMessage,
        handleCancel
    }
}