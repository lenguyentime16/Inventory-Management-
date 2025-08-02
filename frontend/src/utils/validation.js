import { VALIDATION_RULES, PRODUCT_CONSTANTS, CATEGORY_CONSTANTS, AUTH_CONSTANTS } from './constants';

// Form validation functions
export const validateRequired = (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return VALIDATION_RULES.REQUIRED;
    }
    return null;
};

export const validateMinLength = (value, minLength) => {
    if (!value || value.length < minLength) {
        return VALIDATION_RULES.MIN_LENGTH(minLength);
    }
    return null;
};

export const validateMaxLength = (value, maxLength) => {
    if (value && value.length > maxLength) {
        return VALIDATION_RULES.MAX_LENGTH(maxLength);
    }
    return null;
};

export const validateNumber = (value) => {
    if (value !== '' && (isNaN(value) || value < 0)) {
        return VALIDATION_RULES.INVALID_NUMBER;
    }
    return null;
};

export const validateMinValue = (value, minValue) => {
    if (value !== '' && Number(value) < minValue) {
        return VALIDATION_RULES.MIN_VALUE(minValue);
    }
    return null;
};

// Product validation
export const validateProductName = (name) => {
    return validateRequired(name) ||
        validateMaxLength(name, PRODUCT_CONSTANTS.MAX_NAME_LENGTH);
};

export const validateProductDescription = (description) => {
    return validateMaxLength(description, PRODUCT_CONSTANTS.MAX_DESCRIPTION_LENGTH);
};

export const validateProductPrice = (price) => {
    return validateNumber(price) ||
        validateMinValue(price, PRODUCT_CONSTANTS.MIN_PRICE);
};

export const validateProductQuantity = (quantity) => {
    return validateNumber(quantity) ||
        validateMinValue(quantity, PRODUCT_CONSTANTS.MIN_QUANTITY);
};

// Category validation
export const validateCategoryName = (name) => {
    return validateRequired(name) ||
        validateMaxLength(name, CATEGORY_CONSTANTS.MAX_NAME_LENGTH);
};

export const validateCategoryDescription = (description) => {
    return validateMaxLength(description, CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH);
};

// Auth validation
export const validateUsername = (username) => {
    return validateRequired(username);
};

export const validatePassword = (password) => {
    return validateRequired(password) ||
        validateMinLength(password, AUTH_CONSTANTS.MIN_PASSWORD_LENGTH);
};

// Complete form validation
export const validateProductForm = (product) => {
    const errors = {};

    const nameError = validateProductName(product.name);
    if (nameError) errors.name = nameError;

    const descriptionError = validateProductDescription(product.description);
    if (descriptionError) errors.description = descriptionError;

    const priceError = validateProductPrice(product.price);
    if (priceError) errors.price = priceError;

    const quantityError = validateProductQuantity(product.quantity);
    if (quantityError) errors.quantity = quantityError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateCategoryForm = (category) => {
    const errors = {};

    const nameError = validateCategoryName(category.name);
    if (nameError) errors.name = nameError;

    const descriptionError = validateCategoryDescription(category.description);
    if (descriptionError) errors.description = descriptionError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateLoginForm = (loginData) => {
    const errors = {};

    const usernameError = validateUsername(loginData.username);
    if (usernameError) errors.username = usernameError;

    const passwordError = validatePassword(loginData.password);
    if (passwordError) errors.password = passwordError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
