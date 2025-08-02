import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { CategoryContext } from '../contexts/CategoryContext';

// Custom hook to use product context
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

// Custom hook to use category context
export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryProvider');
    }
    return context;
};
