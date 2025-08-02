import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { getErrorMessage } from '../utils/helpers';

export const useProducts = (initialFilters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    // Fetch products based on filters
    const fetchProducts = useCallback(async (searchFilters = filters) => {
        setLoading(true);
        setError(null);

        try {
            const data = await productService.getProducts(searchFilters);
            setProducts(data);
        } catch (err) {
            setError(getErrorMessage(err));
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Create new product
    const createProduct = useCallback(async (productData) => {
        setLoading(true);
        setError(null);

        try {
            const newProduct = await productService.createProduct(productData);
            setProducts(prev => [...prev, newProduct]);
            return newProduct;
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update existing product
    const updateProduct = useCallback(async (id, productData) => {
        setLoading(true);
        setError(null);

        try {
            const updatedProduct = await productService.updateProduct(id, productData);
            setProducts(prev =>
                prev.map(product =>
                    product.id === id ? updatedProduct : product
                )
            );
            return updatedProduct;
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete product
    const deleteProduct = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            await productService.deleteProduct(id);
            setProducts(prev => prev.filter(product => product.id !== id));
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get single product by ID
    const getProductById = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const product = await productService.getProductById(id);
            return product;
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
        fetchProducts(newFilters);
    }, [fetchProducts]);

    // Clear filters
    const clearFilters = useCallback(() => {
        const emptyFilters = {};
        setFilters(emptyFilters);
        fetchProducts(emptyFilters);
    }, [fetchProducts]);

    // Refresh products
    const refreshProducts = useCallback(() => {
        fetchProducts(filters);
    }, [fetchProducts, filters]);

    // Initial fetch on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        filters,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        updateFilters,
        clearFilters,
        refreshProducts,
    };
};
