// API base URL and endpoints
export const API_BASE_URL = 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/auth/login',
    },

    // Products
    PRODUCTS: {
        BASE: '/products',
        BY_ID: (id) => `/products/${id}`,
    },

    // Categories
    CATEGORIES: {
        BASE: '/categories',
        BY_ID: (id) => `/categories/${id}`,
    },
};

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

// Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    USER_INFO: 'user_info',
};

// Form Validation Rules
export const VALIDATION_RULES = {
    REQUIRED: 'This field is required',
    MIN_LENGTH: (length) => `Minimum length is ${length} characters`,
    MAX_LENGTH: (length) => `Maximum length is ${length} characters`,
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_NUMBER: 'Please enter a valid number',
    MIN_VALUE: (value) => `Minimum value is ${value}`,
    MAX_VALUE: (value) => `Maximum value is ${value}`,
};

// Product related constants
export const PRODUCT_CONSTANTS = {
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 255,
    MIN_PRICE: 0,
    MIN_QUANTITY: 0,
};

// Category related constants
export const CATEGORY_CONSTANTS = {
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 255,
};

// Auth related constants
export const AUTH_CONSTANTS = {
    MIN_PASSWORD_LENGTH: 6,
    TOKEN_HEADER: 'Authorization',
    TOKEN_PREFIX: 'Bearer ',
};
