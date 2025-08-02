import axios from 'axios';
import { API_BASE_URL, AUTH_CONSTANTS } from '../utils/constants';
import { getAccessToken, removeAccessToken } from '../utils/helpers';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers[AUTH_CONSTANTS.TOKEN_HEADER] = `${AUTH_CONSTANTS.TOKEN_PREFIX}${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized - token expired or invalid
        if (error.response?.status === 401) {
            removeAccessToken();
            // Redirect to login page or dispatch logout action
            window.location.href = '/login';
        }

        // Handle network errors
        if (!error.response) {
            console.error('Network Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
