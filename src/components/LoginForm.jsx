// // LoginForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './LoginForm.css';

// const LoginForm = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//           const response = await axios.post('http://localhost:5000/auth/login', formData);
//           console.log(response); 
//           localStorage.setItem('token', response.data.token); // Save token
//           setSuccess('Login successful!');
//       } catch (error) {
//           setError('Login failed.');
//           console.error('Error during login:', error.response ? error.response.data : error.message);
//       }
//   };
  

//     return (
//         <div className="form-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                 />
//                 <button type="submit">Login</button>
//                 {error && <p className="error-message">{error}</p>}
//                 {success && <p className="success-message">{success}</p>}
//             </form>
//         </div>
//     );
// };

// export default LoginForm;



// NEW CODE

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', formData);
            console.log(response);
            localStorage.setItem('token', response.data.token); // Save token
            setSuccess('Login successful!');
            navigate('/home'); // Redirect to home page after login
        } catch (error) {
            setError('Login failed.');
            console.error('Error during login:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
};

export default LoginForm;



