import React, { createContext, useReducer } from 'react';
import { categoryService } from '../services/categoryService';
import { getErrorMessage } from '../utils/helpers';

// Action types
const CATEGORY_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_CATEGORIES: 'SET_CATEGORIES',
    ADD_CATEGORY: 'ADD_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

// Initial state
const initialState = {
    categories: [],
    loading: false,
    error: null,
};

// Reducer function
const categoryReducer = (state, action) => {
    switch (action.type) {
        case CATEGORY_ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case CATEGORY_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case CATEGORY_ACTIONS.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null,
            };

        case CATEGORY_ACTIONS.ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
                loading: false,
                error: null,
            };

        case CATEGORY_ACTIONS.UPDATE_CATEGORY:
            return {
                ...state,
                categories: state.categories.map(category =>
                    category.id === action.payload.id ? action.payload : category
                ),
                loading: false,
                error: null,
            };

        case CATEGORY_ACTIONS.DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload),
                loading: false,
                error: null,
            };

        case CATEGORY_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

// Create context
const CategoryContext = createContext();

// Provider component
export const CategoryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoryReducer, initialState);

    // Action creators
    const setLoading = (loading) => {
        dispatch({ type: CATEGORY_ACTIONS.SET_LOADING, payload: loading });
    };

    const setError = (error) => {
        dispatch({ type: CATEGORY_ACTIONS.SET_ERROR, payload: error });
    };

    const clearError = () => {
        dispatch({ type: CATEGORY_ACTIONS.CLEAR_ERROR });
    };

    // Async actions
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const categories = await categoryService.getCategories();
            dispatch({ type: CATEGORY_ACTIONS.SET_CATEGORIES, payload: categories });
        } catch (error) {
            setError(getErrorMessage(error));
        }
    };

    const createCategory = async (categoryData) => {
        setLoading(true);
        try {
            const newCategory = await categoryService.createCategory(categoryData);
            dispatch({ type: CATEGORY_ACTIONS.ADD_CATEGORY, payload: newCategory });
            return newCategory;
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    };

    const updateCategory = async (id, categoryData) => {
        setLoading(true);
        try {
            const updatedCategory = await categoryService.updateCategory(id, categoryData);
            dispatch({ type: CATEGORY_ACTIONS.UPDATE_CATEGORY, payload: updatedCategory });
            return updatedCategory;
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    };

    const deleteCategory = async (id) => {
        setLoading(true);
        try {
            await categoryService.deleteCategory(id);
            dispatch({ type: CATEGORY_ACTIONS.DELETE_CATEGORY, payload: id });
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    };

    const getCategoryById = async (id) => {
        setLoading(true);
        try {
            const category = await categoryService.getCategoryById(id);
            setLoading(false);
            return category;
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    };

    const value = {
        // State
        categories: state.categories,
        loading: state.loading,
        error: state.error,

        // Actions
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
        clearError,
    };

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};

// Export context for use in custom hooks
export { CategoryContext };
