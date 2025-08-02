import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
    const {
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        updateFilters
    } = useProducts();

    const { categories } = useCategories();

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        categoryId: '',
        description: ''
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        fetchProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Validation function
    const validateForm = (data) => {
        const errors = {};

        // Validate name
        if (!data.name.trim()) {
            errors.name = 'Tên sản phẩm không được để trống';
        } else if (data.name.trim().length < 2) {
            errors.name = 'Tên sản phẩm phải có ít nhất 2 ký tự';
        } else if (data.name.trim().length > 100) {
            errors.name = 'Tên sản phẩm không được vượt quá 100 ký tự';
        }

        // Validate price
        const price = parseFloat(data.price);
        if (!data.price.trim()) {
            errors.price = 'Giá không được để trống';
        } else if (isNaN(price)) {
            errors.price = 'Giá phải là một số hợp lệ';
        } else if (price < 0) {
            errors.price = 'Giá không được âm';
        } else if (price > 99999999.99) {
            errors.price = 'Giá không được vượt quá 99,999,999.99 VNĐ';
        } else if (price === 0) {
            errors.price = 'Giá phải lớn hơn 0';
        }

        // Validate quantity
        const quantity = parseInt(data.quantity);
        if (!data.quantity.trim()) {
            errors.quantity = 'Số lượng không được để trống';
        } else if (isNaN(quantity)) {
            errors.quantity = 'Số lượng phải là một số nguyên hợp lệ';
        } else if (quantity < 0) {
            errors.quantity = 'Số lượng không được âm';
        } else if (quantity > 999999) {
            errors.quantity = 'Số lượng không được vượt quá 999,999';
        } else if (!Number.isInteger(quantity)) {
            errors.quantity = 'Số lượng phải là số nguyên';
        }

        // Validate categoryId
        if (!data.categoryId.trim()) {
            errors.categoryId = 'Vui lòng chọn danh mục';
        }

        // Validate description (optional but if provided, check length)
        if (data.description && data.description.trim().length > 255) {
            errors.description = 'Mô tả không được vượt quá 255 ký tự';
        }

        return errors;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const filters = {};
            if (searchTerm.trim()) {
                filters.name = searchTerm.trim();
            }
            updateFilters(filters);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setFormErrors({});

        // Validate form data
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            // Convert string values to appropriate types
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                categoryId: formData.categoryId || null
            };

            if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
            } else {
                await createProduct(productData);
            }
            setShowModal(false);
            resetForm();
            await fetchProducts(); // Refresh the list
        } catch (error) {
            console.error('Error saving product:', error);
            // Set general error if API call fails
            setFormErrors({ general: 'Có lỗi xảy ra khi lưu sản phẩm. Vui lòng thử lại.' });
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            quantity: '',
            categoryId: '',
            description: ''
        });
        setFormErrors({});
        setEditingProduct(null);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            quantity: product.quantity.toString(),
            categoryId: product.categoryId,
            description: product.description || ''
        });
        setFormErrors({});
        setShowModal(true);
    };

    // Handle input change with real-time validation
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error for this field when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProduct(id);
                await fetchProducts(); // Refresh the list
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className={styles.productsPage}>
            <div className={styles.header}>
                <h1>Quản lý sản phẩm</h1>
                <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                >
                    Thêm sản phẩm
                </Button>
            </div>

            <div className={styles.filters}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <Input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
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
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Giá (VNĐ)</th>
                            <th>Tồn kho</th>
                            <th>Danh mục</th>
                            <th>Mô tả</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" className={styles.noData}>
                                    Không có sản phẩm nào
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className={styles.productName}>{product.name}</td>
                                    <td className={styles.price}>
                                        {product.price?.toLocaleString()} VNĐ
                                    </td>
                                    <td className={styles.quantity}>{product.quantity}</td>
                                    <td className={styles.category}>
                                        {categories.find(cat => cat.id === product.categoryId)?.name || 'Không có'}
                                    </td>
                                    <td className={styles.description}>
                                        {product.description || 'Không có mô tả'}
                                    </td>
                                    <td className={styles.actions}>
                                        <Button
                                            variant="secondary"
                                            size="small"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="small"
                                            onClick={() => handleDelete(product.id)}
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
                        <h2>{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
                        <form onSubmit={handleSubmit}>
                            {formErrors.general && (
                                <div className={styles.errorMessage}>
                                    {formErrors.general}
                                </div>
                            )}

                            <Input
                                label="Tên sản phẩm"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                error={formErrors.name}
                                required
                            />
                            <Input
                                label="Giá (VNĐ)"
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                error={formErrors.price}
                                min="0"
                                max="99999999.99"
                                step="0.01"
                                placeholder="Ví dụ: 50000"
                                required
                            />
                            <Input
                                label="Tồn kho"
                                type="number"
                                value={formData.quantity}
                                onChange={(e) => handleInputChange('quantity', e.target.value)}
                                error={formErrors.quantity}
                                min="0"
                                max="999999"
                                step="1"
                                placeholder="Ví dụ: 100"
                                required
                            />
                            <div className={styles.formGroup}>
                                <label htmlFor="categoryId">Danh mục</label>
                                <select
                                    id="categoryId"
                                    value={formData.categoryId}
                                    onChange={(e) => handleInputChange('categoryId', e.target.value)}
                                    className={`${styles.select} ${formErrors.categoryId ? styles.error : ''}`}
                                    required
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.categoryId && (
                                    <span className={styles.errorText}>{formErrors.categoryId}</span>
                                )}
                            </div>
                            <Input
                                label="Mô tả"
                                type="text"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                error={formErrors.description}
                                maxLength="255"
                                placeholder="Mô tả chi tiết về sản phẩm (tùy chọn)"
                            />
                            <div className={styles.modalActions}>
                                <Button type="submit" variant="primary">
                                    {editingProduct ? 'Cập nhật' : 'Thêm'}
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

export default ProductsPage;
