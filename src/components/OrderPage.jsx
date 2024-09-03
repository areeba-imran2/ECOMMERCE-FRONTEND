import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
    const [formData, setFormData] = useState({
        total_amount: '',
        user_id: ''
    });

    const [message, setMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get('http://localhost:5000/orders', config);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error.message);
            setMessage('Failed to fetch orders.');
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
            await axios.post('http://localhost:5000/orders', formData, config);
            setMessage('Order created successfully!');
            fetchOrders();
            setFormData({
                total_amount: '',
                user_id: ''
            });
        } catch (error) {
            console.error('Error creating order:', error.response?.data || error.message);
            setMessage('Failed to create order.');
        }
    };

    const handleEdit = (order) => {
        setEditingOrder(order);
        setFormData({
            total_amount: order.total_amount,
            user_id: order.user_id
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.put(`http://localhost:5000/orders/${editingOrder.order_id}`, formData, config);
            setMessage('Order updated successfully!');
            setEditingOrder(null);
            setFormData({
                total_amount: '',
                user_id: ''
            });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error.response?.data || error.message);
            setMessage('Failed to update order.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.delete(`http://localhost:5000/orders/${id}`, config);
            setOrders(orders.filter((order) => order.order_id !== id));
            setMessage('Order deleted successfully!');
        } catch (error) {
            console.error('Error deleting order:', error.response?.data || error.message);
            setMessage('Failed to delete order.');
        }
    };

    const handleCancelEdit = () => {
        setEditingOrder(null);
        setFormData({
            total_amount: '',
            user_id: ''
        });
        setMessage('');
    };

    const handleNavigateToCategories = () => {
        navigate('/categories');
    };

    const handleNavigateToProductManagement = () => {
        navigate('/product-categories'); // Update to the correct path
    };

    return (
        <div className="order-page-container">
            <h2 className="page-title">Manage Orders</h2>
            <div className="form-and-list">
                <div className="order-form-container">
                    <h3>{editingOrder ? 'Edit Order' : 'Add New Order'}</h3>
                    <form className="order-form" onSubmit={editingOrder ? handleUpdate : handleSubmit}>
                        <div className="form-group">
                            <input
                                type="number"
                                step="0.01"
                                name="total_amount"
                                placeholder="Total Amount"
                                value={formData.total_amount}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                name="user_id"
                                placeholder="User ID"
                                value={formData.user_id}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">
                                {editingOrder ? 'Save Changes' : 'Create Order'}
                            </button>
                            {editingOrder && (
                                <button type="button" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
                <div className="order-list">
                    <h3>Order List</h3>
                    {orders.length === 0 ? (
                        <p>No orders available.</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.order_id} className="order-item">
                                <div className="order-item-content">
                                    <p><strong>Order ID:</strong> {order.order_id}</p>
                                    <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                                    <p><strong>Total Amount:</strong> ${order.total_amount}</p>
                                    <p><strong>User ID:</strong> {order.user_id}</p>
                                </div>
                                <div className="order-buttons">
                                    <button onClick={() => handleEdit(order)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(order.order_id)} className="delete-button">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="navigation-buttons">
                <button onClick={handleNavigateToCategories} className="nav-button">
                    Go to Categories
                </button>
                <button onClick={handleNavigateToProductManagement} className="nav-button">
                    Manage Product-Category 
                </button>
            </div>
        </div>
    );
};

export default OrderPage;
