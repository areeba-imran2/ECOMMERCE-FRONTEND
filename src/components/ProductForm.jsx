import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        product_name: '',
        product_price: '',
        product_quantity: '',
        description: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');  // Retrieve the token
            const config = {
                headers: {
                    Authorization: token  // Attach the token to the request header
                }
            };
            const response = await axios.post('http://localhost:5000/products', formData, config);
            setMessage('Product created successfully!');
            console.log('Product created successfully', response.data);
        } catch (error) {
            setMessage('Failed to create product.');
            console.error('Error creating product', error.response?.data || error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Create Product</h2>
            <form className="product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="product_name"
                    placeholder="Product Name"
                    value={formData.product_name}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="product_price"
                    placeholder="Product Price"
                    value={formData.product_price}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="product_quantity"
                    placeholder="Product Quantity"
                    value={formData.product_quantity}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Create Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProductForm;
