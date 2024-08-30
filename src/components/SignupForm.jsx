import React, { useState } from 'react';
import './SignupForm.css';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/signup', formData);
            setMessage('Signup successful!'); // Show success message
            console.log('Signup successful', response.data);
        } catch (error) {
            setMessage('Signup failed. Please try again.'); // Show error message
            console.error('Signup failed', error.response?.data || error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Signup</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Signup</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default SignupForm;








