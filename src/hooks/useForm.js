// hooks/useForm.js
import { useState, useCallback } from 'react';

export function useForm({ initialValues, validators, onSubmit, requiredFields = [] }) {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar error al escribir
        if (touched[name]) {
            const validator = validators[name];
            if (validator) {
                const error = validator(value);
                setErrors(prev => ({ ...prev, [name]: error }));
            }
        }
    }, [touched, validators]);

    const handleBlur = useCallback((event) => {
        const { name, value } = event.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        const validator = validators[name];
        if (!validator) return;

        const error = validator(value);
        setErrors(prev => ({ ...prev, [name]: error }));
    }, [validators]);

    const validateAll = useCallback(() => {
        const newErrors = {};
        Object.keys(validators).forEach(key => {
            const error = validators[key](formData[key]);
            if (error) newErrors[key] = error;
        });
        return newErrors;
    }, [validators, formData]);

    const handleSubmit = useCallback(async (event) => {
        if (event?.preventDefault) {
            event.preventDefault();
        }

        // Validar todos los campos
        const allErrors = validateAll();
        setErrors(allErrors);
        setTouched(Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        if (Object.keys(allErrors).length > 0) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await onSubmit(formData);
        } catch (error) {
            setSubmitError(error.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateAll, onSubmit, initialValues]);

    const isValid = Object.keys(errors).every(key => !errors[key])
        && requiredFields.every(key => formData[key])
    return {
        formData,
        errors,
        touched,
        isSubmitting,
        submitError,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit
    };
}