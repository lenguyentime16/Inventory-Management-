import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationRules = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input change
    const handleChange = useCallback((name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    }, [errors]);

    // Handle input blur
    const handleBlur = useCallback((name) => {
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        // Validate field on blur if validation rule exists
        if (validationRules[name]) {
            const error = validationRules[name](values[name]);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    }, [validationRules, values]);

    // Validate all fields
    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationRules).forEach(fieldName => {
            const error = validationRules[fieldName](values[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [validationRules, values]);

    // Handle form submission
    const handleSubmit = useCallback(async (onSubmit) => {
        setIsSubmitting(true);

        // Mark all fields as touched
        const allTouched = Object.keys(validationRules).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        // Validate form
        const isValid = validateForm();

        if (isValid) {
            try {
                await onSubmit(values);
            } catch (error) {
                // Handle submission errors
                console.error('Form submission error:', error);
            }
        }

        setIsSubmitting(false);
        return isValid;
    }, [values, validationRules, validateForm]);

    // Reset form to initial values
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    // Set specific field value
    const setFieldValue = useCallback((name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // Set specific field error
    const setFieldError = useCallback((name, error) => {
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }, []);

    // Set multiple values at once
    const setFormValues = useCallback((newValues) => {
        setValues(prev => ({
            ...prev,
            ...newValues
        }));
    }, []);

    // Check if form is valid
    const isValid = Object.keys(errors).length === 0 &&
        Object.values(errors).every(error => !error);

    // Check if form has been modified
    const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        isDirty,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setFieldValue,
        setFieldError,
        setFormValues,
        validateForm,
    };
};
