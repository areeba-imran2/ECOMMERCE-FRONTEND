import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/SignupForm';
import Login from './components/LoginForm';
import ProductPage from './components/ProductPage';
import OrderPage from './components/OrderPage';
import CategoryPage from './components/CategoryPage';
import ProductCategoryManagement from './components/ProductCategoryManagement';
import { AuthProvider, useAuth } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Component to handle routing and authentication
const AppRoutes = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <>
            <Navbar onLogout={logout} />
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<ProtectedRoute element={ProductPage} />} />
                <Route path="/orders" element={<ProtectedRoute element={OrderPage} />} />
                <Route path="/categories" element={<ProtectedRoute element={CategoryPage} />} />
                <Route path="/product-categories" element={<ProtectedRoute element={ProductCategoryManagement} />} />
                <Route path="/" element={<Navigate to={isAuthenticated ? "/products" : "/login"} />} />
            </Routes>
        </>
    );
};

// Main App component
function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <AppRoutes />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

