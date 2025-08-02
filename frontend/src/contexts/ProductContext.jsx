import React, { createContext, useReducer } from 'react';
import { productService } from '../services/productService';
import { getErrorMessage } from '../utils/helpers';

// Action types
const PRODUCT_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_PRODUCTS: 'SET_PRODUCTS',
    ADD_PRODUCT: 'ADD_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    SET_FILTERS: 'SET_FILTERS',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

// Initial state
const initialState = {
    products: [],
    loading: false,
    error: null,
    filters: {},
};

// Reducer function
const productReducer = (state, action) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case PRODUCT_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case PRODUCT_ACTIONS.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };

        case PRODUCT_ACTIONS.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
                loading: false,
                error: null,
            };

        case PRODUCT_ACTIONS.UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
                loading: false,
                error: null,
            };

        case PRODUCT_ACTIONS.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
                loading: false,
                error: null,
            };

        case PRODUCT_ACTIONS.SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };

        case PRODUCT_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

// Create context
const ProductContext = createContext();

// Provider component
export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    // Action creators
    const setLoading = (loading) => {
        dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: loading });
    };

    const setError = (error) => {
        dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error });
    };

    const clearError = () => {
        dispatch({ type: PRODUCT_ACTIONS.CLEAR_ERROR });
    };

    const setFilters = (filters) => {
        dispatch({ type: PRODUCT_ACTIONS.SET_FILTERS, payload: filters });
    };

    // Async actions
    const fetchProducts = async (filters = {}) => {
        setLoading(true);
        try {
            const products = await productService.getProducts(filters);
            dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, payload: products });
            setFilters(filters);
        } catch (error) {
            setError(getErrorMessage(error));
        }
    };

    const createProduct = async (productData) => {
        setLoading(true);
        try {
            const newProduct = await productService.createProduct(productData);
            dispatch({ type: PRODUCT_ACTIONS.ADD_PRODUCT, payload: newProduct });
            return newProduct;
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    };

    const updateProduct = async (id, productData) => {
        setLoading(true);
        try {
            const updatedProduct = await productService.updateProduct(id, productData);
            dispatch({ type: PRODUCT_ACTIONS.UPDATE_PRODUCT, payload: updatedProduct });
            return updatedProduct;
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await productService.deleteProduct(id);
            dispatch({ type: PRODUCT_ACTIONS.DELETE_PRODUCT, payload: id });
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    };

    const getProductById = async (id) => {
        setLoading(true);
        try {
            const product = await productService.getProductById(id);
            setLoading(false);
            return product;
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    };

    const value = {
        // State
        products: state.products,
        loading: state.loading,
        error: state.error,
        filters: state.filters,

        // Actions
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        setFilters,
        clearError,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

// Export context for use in custom hooks
export { ProductContext };
