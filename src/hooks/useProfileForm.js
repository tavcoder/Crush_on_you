// hooks/useProfileForm.js
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { updateProfile } from '../services/api/users.api';
import { useForm } from './useForm';
import { fieldValidators } from '../utils/validateUtils';

export function useProfileForm(user) {
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (formData) => {
        if (!user?.id) return
        await updateProfile(user.id, formData);
        navigate('/feed');
    }, [user?.id, navigate]);

    const handleInterestToggle = (value) => {
        setFormData((prev) => {
            const alreadySelected = prev.interest.includes(value);

            return {
                ...prev,
                interest: alreadySelected
                    ? prev.interest.filter((item) => item !== value)
                    : [...prev.interest, value]
            };
        });
    };

    const validators = {
        userName: fieldValidators.nameOrSurname,
        userNick: fieldValidators.nick,
        bio: fieldValidators.bio,
    };

    const initialValues = {
        userName: user?.userName || '',
        userSurName: user?.userSurName || '',
        userNick: user?.userNick || '',
        bio: user?.bio || '',
        city: user?.city || '',
        country: user?.country || '',
        education: user?.education || '',
        language: user?.language || '',
        smoke: user?.smoke || '',
        interest: user?.interest || [],
    };

    return useForm({
        initialValues,
        validators,
        onSubmit: handleSubmit,
        handleInterestToggle,
    });
}