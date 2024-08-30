// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// // import Signup from './components/SignupForm';
// // import Login from './components/LoginForm';
// // import './App.css'; // Import the CSS file for styling

// // function App() {
// //     return (
// //         <Router>
// //             <div className="container">
// //                 <nav className="nav">
// //                     <Link to="/signup">
// //                         <button className="nav-button">Signup</button>
// //                     </Link>
// //                     <Link to="/login">
// //                         <button className="nav-button">Login</button>
// //                     </Link>
// //                 </nav>
// //                 <Routes>
// //                     <Route path="/signup" element={<Signup />} />
// //                     <Route path="/login" element={<Login />} />
// //                 </Routes>
// //             </div>
// //         </Router>
// //     );
// // }

// // export default App;


// // NEW CODEEE

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
// import Signup from './components/SignupForm';
// import Login from './components/LoginForm';
// import ProductForm from './components/ProductForm';
// import './App.css';

// function App() {
//     return (
//         <Router>
//             <div className="container">
//                 <nav className="nav">
//                     <Link to="/signup">
//                         <button className="nav-button">Signup</button>
//                     </Link>
//                     <Link to="/login">
//                         <button className="nav-button">Login</button>
//                     </Link>
//                 </nav>
//                 <Routes>
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/home" element={<ProductForm />} />
//                     <Route path="/" element={<Navigate to="/login" />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import Signup from './components/SignupForm';
import Login from './components/LoginForm';
import ProductForm from './components/ProductForm';
import './App.css';

// Navigation component to conditionally render buttons
function Navigation() {
    const location = useLocation();

    // Check if the current route is '/home'
    const isHomePage = location.pathname === '/home';

    // Only show the buttons if not on the home page
    if (!isHomePage) {
        return (
            <nav className="nav">
                <Link to="/signup">
                    <button className="nav-button">Signup</button>
                </Link>
                <Link to="/login">
                    <button className="nav-button">Login</button>
                </Link>
            </nav>
        );
    }

    return null; // Render nothing if on the home page
}

function App() {
    return (
        <Router>
            <div className="container">
                <Navigation /> {/* Render the navigation component */}
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<ProductForm />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

