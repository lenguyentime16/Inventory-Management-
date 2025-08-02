import { useState } from 'react';
import { authService } from '../services/authService';
import { setAccessToken, removeAccessToken, getErrorMessage } from '../utils/helpers';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Login function
    const login = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.login(credentials);

            if (response.access_token) {
                setAccessToken(response.access_token);
                setIsAuthenticated(true);
                return response;
            } else {
                throw new Error('No access token received');
            }
        } catch (err) {
            setError(getErrorMessage(err));
            setIsAuthenticated(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        removeAccessToken();
        setIsAuthenticated(false);
        setError(null);
        // Redirect to login page
        window.location.href = '/login';
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    return {
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        clearError,
    };
};
