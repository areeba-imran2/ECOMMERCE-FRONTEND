import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './CategoryPage.css';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ category_name: '', description: '' });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();  // Initialize useNavigate hook

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error.response?.data || error.message);
            setMessage('Failed to fetch categories.');
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // Update existing category
                await axios.put(`http://localhost:5000/categories/${editId}`, form);
                setMessage('Category updated successfully!');
            } else {
                // Create new category
                await axios.post('http://localhost:5000/categories', form);
                setMessage('Category created successfully!');
            }
            setForm({ category_name: '', description: '' });
            setEditId(null);
            fetchCategories(); // Refresh the category list
        } catch (error) {
            console.error('Error saving category:', error.response?.data || error.message);
            setMessage('Failed to save category.');
        }
    };

    const handleEdit = (category) => {
        setForm({ category_name: category.category_name, description: category.description });
        setEditId(category.category_id);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/categories/${editId}`, form);
            setMessage('Category updated successfully!');
            setForm({ category_name: '', description: '' });
            setEditId(null);
            fetchCategories(); // Refresh the category list
        } catch (error) {
            console.error('Error updating category:', error.response?.data || error.message);
            setMessage('Failed to update category.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/categories/${id}`);
            setCategories(categories.filter((category) => category.category_id !== id));
            setMessage('Category deleted successfully!');
        } catch (error) {
            console.error('Error deleting category:', error.response?.data || error.message);
            setMessage('Failed to delete category.');
        }
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setForm({ category_name: '', description: '' });
        setMessage('');
    };

    const handleNavigateToOrders = () => {
        navigate('/orders');
    };

    return (
        <div className="category-page-container">
            <h2 className="page-title">Manage Categories</h2>
            <div className="form-and-list">
                <div className="category-form-container">
                    <h3>{editId ? 'Edit Category' : 'Add New Category'}</h3>
                    <form className="category-form" onSubmit={editId ? handleUpdate : handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="category_name"
                                placeholder="Category Name"
                                value={form.category_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">
                                {editId ? 'Save Changes' : 'Create Category'}
                            </button>
                            {editId && (
                                <button type="button" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
                <div className="category-list">
                    <h3>Category List</h3>
                    {categories.length === 0 ? (
                        <p>No categories available.</p>
                    ) : (
                        categories.map((category) => (
                            <div key={category.category_id} className="category-item">
                                <div className="category-item-content">
                                    <p><strong>Category Name:</strong> {category.category_name}</p>
                                    <p><strong>Description:</strong> {category.description}</p>
                                </div>
                                <div className="category-buttons">
                                    <button onClick={() => handleEdit(category)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(category.category_id)} className="delete-button">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="navigation-buttons">
                <button onClick={handleNavigateToOrders} className="nav-button">
                    Go to Orders
                </button>
            </div>
        </div>
    );
};

export default CategoryPage;
