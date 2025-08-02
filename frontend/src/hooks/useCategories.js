import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '../services/categoryService';
import { getErrorMessage } from '../utils/helpers';

export const useCategories = (initialFilters = {}) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    // Fetch categories based on filters
    const fetchCategories = useCallback(async (searchFilters = filters) => {
        setLoading(true);
        setError(null);

        try {
            const data = await categoryService.getCategories(searchFilters);
            setCategories(data);
        } catch (err) {
            setError(getErrorMessage(err));
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Create new category
    const createCategory = useCallback(async (categoryData) => {
        setLoading(true);
        setError(null);

        try {
            const newCategory = await categoryService.createCategory(categoryData);
            setCategories(prev => [...prev, newCategory]);
            return newCategory;
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update existing category
    const updateCategory = useCallback(async (id, categoryData) => {
        setLoading(true);
        setError(null);

        try {
            const updatedCategory = await categoryService.updateCategory(id, categoryData);
            setCategories(prev =>
                prev.map(category =>
                    category.id === id ? updatedCategory : category
                )
            );
            return updatedCategory;
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete category
    const deleteCategory = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            await categoryService.deleteCategory(id);
            setCategories(prev => prev.filter(category => category.id !== id));
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get single category by ID
    const getCategoryById = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const category = await categoryService.getCategoryById(id);
            return category;
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update filters and refetch
    const updateFilters = useCallback((newFilters) => {
        setFilters(newFilters);
        fetchCategories(newFilters);
    }, [fetchCategories]);

    // Clear filters
    const clearFilters = useCallback(() => {
        const emptyFilters = {};
        setFilters(emptyFilters);
        fetchCategories(emptyFilters);
    }, [fetchCategories]);

    // Refresh categories
    const refreshCategories = useCallback(() => {
        fetchCategories(filters);
    }, [fetchCategories, filters]);

    // Initial fetch on mount
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        filters,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
        updateFilters,
        clearFilters,
        refreshCategories,
    };
};
