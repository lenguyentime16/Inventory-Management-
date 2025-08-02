import { STORAGE_KEYS } from './constants';

// Local Storage helpers
export const setStorageItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const getStorageItem = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
};

export const removeStorageItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
};

export const clearStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};

// Token management
export const setAccessToken = (token) => {
    setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const getAccessToken = () => {
    return getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const removeAccessToken = () => {
    removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const isAuthenticated = () => {
    return !!getAccessToken();
};

// Format helpers
export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};

export const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN').format(number);
};

export const formatDate = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
};

// String helpers
export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// Array helpers
export const sortByField = (array, field, direction = 'asc') => {
    return [...array].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (direction === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
};

export const filterBySearchTerm = (array, searchTerm, fields) => {
    if (!searchTerm) return array;

    const lowercaseSearchTerm = searchTerm.toLowerCase();

    return array.filter(item =>
        fields.some(field =>
            item[field] &&
            item[field].toString().toLowerCase().includes(lowercaseSearchTerm)
        )
    );
};

// Debounce function for search
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Error handling helpers
export const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return Array.isArray(error.response.data.message)
            ? error.response.data.message.join(', ')
            : error.response.data.message;
    }

    if (error.message) {
        return error.message;
    }

    return 'An unexpected error occurred';
};

export const isNetworkError = (error) => {
    return !error.response && error.request;
};

// UUID validation
export const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};
