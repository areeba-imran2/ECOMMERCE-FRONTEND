import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './LoginForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Use Auth context

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', formData);
            const { token } = response.data;
            
            // Store token and update success message
            login(token); // Update context with token
            setSuccess('Login successful!');
            setError('');

            // Redirect to products page
            navigate('/products');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed.');
            setSuccess('');
            console.error('Error during login:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="form-container">
            <h1>Welcome to E-commerce Store</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
            <div className="footer-text">
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;

