import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const authService = {
    // Login user
    login: async (credentials) => {
        try {
            console.log('Attempting login with URL:', `${api.defaults.baseURL}${API_ENDPOINTS.AUTH.LOGIN}`);
            const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
            console.log('Login response:', response);
            // Backend returns: { statusCode: 200, message: "Success", data: { access_token: "..." } }
            return response.data.data; // Return the inner data object
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Logout user (client-side only)
    logout: () => {
        // Remove token from storage
        localStorage.removeItem('access_token');
        // Redirect to login page
        window.location.href = '/login';
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const token = localStorage.getItem('access_token');
        return !!token;
    },

    // Get current auth token
    getToken: () => {
        return localStorage.getItem('access_token');
    },
};
