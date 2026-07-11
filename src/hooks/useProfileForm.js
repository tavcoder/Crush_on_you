// hooks/useProfileForm.js
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from './useForm';
import { useUpdateProfile } from '../hooks/useUsers'
import { fieldValidators } from '../utils/validateUtils';

export function useProfileForm(user) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { updateProfile } = useUpdateProfile();
    const handleSubmit = useCallback(async (formData) => {
        if (!user?.id) return
        try {
            await updateProfile({
                ...formData,
                email: user.email
            });
            navigate('/feed')
        } catch (error) {
            setErrorMessage(`An error occurred while updating the profile: ${error.message}`)
        }
    }, [user, navigate, updateProfile])

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
            city: user?.city || '',
            country: user?.country || '',
            interests: user?.interests || [],
            bio: user?.profileDetails?.bio || '',
            education: user?.profileDetails?.education || '',
            languages: user?.profileDetails?.languages || '',
            smoke: user?.profileDetails?.smoke || '',
            drink: user?.profileDetails?.drink || '',
        }
    ), [user]);
    const form = useForm({ initialValues, validators, onSubmit: handleSubmit })

    return {
        ...form,
        errorMessage,
        handleCancel
    }
}