import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const productService = {
    // Get all products with optional filters
    getProducts: async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.name) {
            params.append('name', filters.name);
        }

        if (filters.categoryId) {
            params.append('categoryId', filters.categoryId);
        }

        const response = await api.get(`${API_ENDPOINTS.PRODUCTS.BASE}?${params.toString()}`);
        return response.data.data || response.data; // Handle backend response format
    },

    // Get single product by ID
    getProductById: async (id) => {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.BY_ID(id));
        return response.data.data || response.data; // Handle backend response format
    },

    // Create new product
    createProduct: async (productData) => {
        const response = await api.post(API_ENDPOINTS.PRODUCTS.BASE, productData);
        return response.data.data || response.data; // Handle backend response format
    },

    // Update existing product
    updateProduct: async (id, productData) => {
        const response = await api.patch(API_ENDPOINTS.PRODUCTS.BY_ID(id), productData);
        return response.data.data || response.data; // Handle backend response format
    },

    // Delete product
    deleteProduct: async (id) => {
        const response = await api.delete(API_ENDPOINTS.PRODUCTS.BY_ID(id));
        return response.data.data || response.data; // Handle backend response format
    },
};
