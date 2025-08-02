import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import Button from '../components/common/Button/Button';
import Input from '../components/common/Input/Input';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();
    const [submitError, setSubmitError] = useState('');

    const {
        values,
        errors,
        handleChange
    } = useForm(
        { username: '', password: '' },
        {
            username: (value) => !value ? 'Username is required' : null,
            password: (value) => !value ? 'Password is required' : null // Bỏ validation length để cho phép submit
        }
    );

    const onSubmit = async (formData) => {
        setSubmitError('');
        try {
            await login(formData);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            // Xử lý lỗi cụ thể từ backend
            let errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';

            if (err.response) {
                // Lỗi từ backend
                if (err.response.status === 401) {
                    errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.';
                } else if (err.response.data && err.response.data.message) {
                    errorMessage = err.response.data.message;
                }
            } else if (err.message) {
                errorMessage = err.message;
            }

            setSubmitError(errorMessage);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra basic validation trước khi submit
        if (!values.username.trim() || !values.password.trim()) {
            setSubmitError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
            return;
        }
        onSubmit(values);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <h1 className={styles.title}>Inventory Management</h1>
                    <p className={styles.subtitle}>Sign in to your account</p>
                </div>

                <form onSubmit={handleFormSubmit} className={styles.loginForm}>
                    <Input
                        label="Username"
                        type="text"
                        value={values.username}
                        onChange={(e) => {
                            handleChange('username', e.target.value);
                            setSubmitError(''); // Clear error when user types
                        }}
                        placeholder="Enter your username"
                        error={errors.username}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={(e) => {
                            handleChange('password', e.target.value);
                            setSubmitError(''); // Clear error when user types
                        }}
                        placeholder="Enter your password"
                        error={errors.password}
                        required
                    />

                    {(submitError || error) && (
                        <div className={styles.errorAlert}>
                            {submitError || error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        disabled={loading}
                        className={styles.submitButton}
                    >
                        {loading ? 'Đang đăng nhập...' : 'Sign In'}
                    </Button>
                </form>

                <div className={styles.loginFooter}>
                    <p className={styles.demoCredentials}>
                        <strong>Demo Credentials:</strong><br />
                        Username: admin<br />
                        Password: password
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
