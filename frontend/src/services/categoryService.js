import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const categoryService = {
    // Get all categories with optional filters
    getCategories: async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.name) {
            params.append('name', filters.name);
        }

        const queryString = params.toString();
        const url = queryString ? `${API_ENDPOINTS.CATEGORIES.BASE}?${queryString}` : API_ENDPOINTS.CATEGORIES.BASE;

        const response = await api.get(url);
        return response.data.data || response.data; // Handle backend response format
    },

    // Get single category by ID
    getCategoryById: async (id) => {
        const response = await api.get(API_ENDPOINTS.CATEGORIES.BY_ID(id));
        return response.data.data || response.data; // Handle backend response format
    },

    // Create new category
    createCategory: async (categoryData) => {
        const response = await api.post(API_ENDPOINTS.CATEGORIES.BASE, categoryData);
        return response.data.data || response.data; // Handle backend response format
    },

    // Update existing category
    updateCategory: async (id, categoryData) => {
        const response = await api.patch(API_ENDPOINTS.CATEGORIES.BY_ID(id), categoryData);
        return response.data.data || response.data; // Handle backend response format
    },

    // Delete category
    deleteCategory: async (id) => {
        const response = await api.delete(API_ENDPOINTS.CATEGORIES.BY_ID(id));
        return response.data.data || response.data; // Handle backend response format
    },
};
