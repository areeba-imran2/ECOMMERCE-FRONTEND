import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
    const [formData, setFormData] = useState({
        product_name: '',
        product_price: '',
        product_quantity: '',
        description: ''
    });

    const [message, setMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error.response?.data || error.message);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            if (editingProduct) {
                await axios.put(`http://localhost:5000/products/${editingProduct.product_id}`, formData, config);
                setEditingProduct(null);
            } else {
                await axios.post('http://localhost:5000/products', formData, config);
            }
            setMessage(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
            fetchProducts();
            setFormData({
                product_name: '',
                product_price: '',
                product_quantity: '',
                description: ''
            });
        } catch (error) {
            setMessage(editingProduct ? 'Failed to update product.' : 'Failed to create product.');
            console.error('Error creating/updating product', error.response?.data || error.message);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            product_name: product.product_name,
            product_price: product.product_price,
            product_quantity: product.product_quantity,
            description: product.description
        });
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.delete(`http://localhost:5000/products/${id}`, config);
            if (response.status === 200) {
                setProducts(products.filter((product) => product.product_id !== id));
                console.log("Product deleted successfully");
            } else {
                console.error("Failed to delete product", response.data);
            }
        } catch (error) {
            console.error('Error deleting product', error.response?.data || error.message);
        }
    };
    

    const goToOrders = () => {
        navigate('/orders');
    };

    return (
        <div className="product-page-container">
            <h2 className="page-title">Manage Products</h2>
            <div className="product-form-container">
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="product_name"
                            placeholder="Product Name"
                            value={formData.product_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="product_price"
                            placeholder="Product Price"
                            value={formData.product_price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="product_quantity"
                            placeholder="Product Quantity"
                            value={formData.product_quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            placeholder="Product Description"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="form-buttons">
                        <button type="submit">
                            {editingProduct ? 'Save Changes' : 'Create Product'}
                        </button>
                        {editingProduct && (
                            <button type="button" onClick={() => setEditingProduct(null)}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
            <div className="product-list">
                <h3>Product List</h3>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5">No products available.</td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.product_id}>
                                    <td>{product.product_name}</td>
                                    <td>${product.product_price}</td>
                                    <td>{product.product_quantity}</td>
                                    <td>{product.description}</td>
                                    <td className="action-buttons">
                                        <button onClick={() => handleEdit(product)} className="edit-button">Edit</button>
                                        <button onClick={() => handleDelete(product.product_id)} className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="order-button-container">
                <button onClick={goToOrders} className="order-button">View Orders</button>
            </div>
        </div>
    );
};

export default ProductPage;
