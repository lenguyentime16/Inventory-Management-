import React, { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import styles from './CategoriesPage.module.css';

const CategoriesPage = () => {
    const {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        updateFilters
    } = useCategories();

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const filters = {};
            if (searchTerm.trim()) {
                filters.name = searchTerm.trim();
            }
            updateFilters(filters);
        } catch (error) {
            console.error('Error searching categories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, formData);
            } else {
                await createCategory(formData);
            }
            setShowModal(false);
            resetForm();
            await fetchCategories(); // Refresh the list
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: ''
        });
        setEditingCategory(null);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                await deleteCategory(id);
                await fetchCategories(); // Refresh the list
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.categoriesPage}>
            <div className={styles.header}>
                <h1>Quản lý danh mục</h1>
                <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                >
                    Thêm danh mục
                </Button>
            </div>

            <div className={styles.filters}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <Input
                        type="text"
                        placeholder="Tìm kiếm danh mục..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" variant="secondary">
                        Tìm kiếm
                    </Button>
                </form>
            </div>

            {loading && <div className={styles.loading}>Đang tải...</div>}
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.tableContainer}>
                <table className={styles.categoryTable}>
                    <thead>
                        <tr>
                            <th>Tên danh mục</th>
                            <th>Mô tả</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length === 0 ? (
                            <tr>
                                <td colSpan="3" className={styles.noData}>
                                    {searchTerm ? 'Không tìm thấy danh mục nào' : 'Không có danh mục nào'}
                                </td>
                            </tr>
                        ) : (
                            filteredCategories.map((category) => (
                                <tr key={category.id}>
                                    <td className={styles.categoryName}>{category.name}</td>
                                    <td className={styles.description}>
                                        {category.description || 'Không có mô tả'}
                                    </td>
                                    <td className={styles.actions}>
                                        <Button
                                            variant="secondary"
                                            size="small"
                                            onClick={() => handleEdit(category)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="small"
                                            onClick={() => handleDelete(category.id)}
                                        >
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>{editingCategory ? 'Sửa danh mục' : 'Thêm danh mục'}</h2>
                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Tên danh mục"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Mô tả"
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className={styles.modalActions}>
                                <Button type="submit" variant="primary">
                                    {editingCategory ? 'Cập nhật' : 'Thêm'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
