import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = ({ onLogout }) => {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/product-categories">Product Categories</Link></li>
                <li>
                    <button onClick={onLogout} className="logout-button">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
