import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductCategoryManagement.css'; // Import the CSS file

const ProductCategoryManagement = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productCategories, setProductCategories] = useState([]);

    const [newProductId, setNewProductId] = useState('');
    const [newCategoryId, setNewCategoryId] = useState('');
    const [updateOldProductId, setUpdateOldProductId] = useState('');
    const [updateOldCategoryId, setUpdateOldCategoryId] = useState('');
    const [updateNewProductId, setUpdateNewProductId] = useState('');
    const [updateNewCategoryId, setUpdateNewCategoryId] = useState('');
    const [deleteProductId, setDeleteProductId] = useState('');
    const [deleteCategoryId, setDeleteCategoryId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchProductCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage('Failed to fetch products.');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setMessage('Failed to fetch categories.');
        }
    };

    const fetchProductCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/product-categories');
            setProductCategories(response.data);
        } catch (error) {
            console.error('Error fetching product categories:', error);
            setMessage('Failed to fetch product categories.');
        }
    };

    const handleAdd = async () => {
        try {
            await axios.post('http://localhost:5000/product-categories', {
                product_id: newProductId,
                category_id: newCategoryId
            });
            setMessage('Association added successfully');
            setNewProductId('');
            setNewCategoryId('');
            fetchProductCategories(); // Refresh the list
        } catch (error) {
            console.error('Error adding association:', error);
            setMessage('Failed to add association.');
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put('http://localhost:5000/product-categories', {
                old_product_id: updateOldProductId,
                old_category_id: updateOldCategoryId,
                new_product_id: updateNewProductId,
                new_category_id: updateNewCategoryId
            });
            setMessage('Association updated successfully');
            setUpdateOldProductId('');
            setUpdateOldCategoryId('');
            setUpdateNewProductId('');
            setUpdateNewCategoryId('');
            fetchProductCategories(); // Refresh the list
        } catch (error) {
            console.error('Error updating association:', error);
            setMessage('Failed to update association.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete('http://localhost:5000/product-categories', {
                data: {
                    product_id: deleteProductId,
                    category_id: deleteCategoryId
                }
            });
            setMessage('Association deleted successfully');
            setDeleteProductId('');
            setDeleteCategoryId('');
            fetchProductCategories(); // Refresh the list
        } catch (error) {
            console.error('Error deleting association:', error);
            setMessage('Failed to delete association.');
        }
    };

    return (
        <div className="product-category-management-container">
            <h2 className="page-title">Product-Category Management</h2>
            <div className="form-and-list">
                <div>
                    <h3>Add Association</h3>
                    <select value={newProductId} onChange={(e) => setNewProductId(e.target.value)}>
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option key={product.product_id} value={product.product_id}>
                                {product.product_name}
                            </option>
                        ))}
                    </select>
                    <select value={newCategoryId} onChange={(e) => setNewCategoryId(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAdd}>Add</button>
                </div>
                <div>
                    <h3>Update Association</h3>
                    <select value={updateOldProductId} onChange={(e) => setUpdateOldProductId(e.target.value)}>
                        <option value="">Select Old Product</option>
                        {products.map((product) => (
                            <option key={product.product_id} value={product.product_id}>
                                {product.product_name}
                            </option>
                        ))}
                    </select>
                    <select value={updateOldCategoryId} onChange={(e) => setUpdateOldCategoryId(e.target.value)}>
                        <option value="">Select Old Category</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                    <select value={updateNewProductId} onChange={(e) => setUpdateNewProductId(e.target.value)}>
                        <option value="">Select New Product</option>
                        {products.map((product) => (
                            <option key={product.product_id} value={product.product_id}>
                                {product.product_name}
                            </option>
                        ))}
                    </select>
                    <select value={updateNewCategoryId} onChange={(e) => setUpdateNewCategoryId(e.target.value)}>
                        <option value="">Select New Category</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleUpdate}>Update</button>
                </div>
                <div>
                    <h3>Delete Association</h3>
                    <select value={deleteProductId} onChange={(e) => setDeleteProductId(e.target.value)}>
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option key={product.product_id} value={product.product_id}>
                                {product.product_name}
                            </option>
                        ))}
                    </select>
                    <select value={deleteCategoryId} onChange={(e) => setDeleteCategoryId(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <h3>Product Categories List</h3>
            <ul>
                {productCategories.map((pc) => {
                    const product = products.find(p => p.product_id === pc.product_id);
                    const category = categories.find(c => c.category_id === pc.category_id);
                    return (
                        <li key={`${pc.product_id}-${pc.category_id}`}>
                            Product: {product?.product_name || 'Unknown'}, Category: {category?.category_name || 'Unknown'}
                        </li>
                    );
                })}
            </ul>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ProductCategoryManagement;
