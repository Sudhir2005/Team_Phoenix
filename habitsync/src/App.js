import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token'); // Replace with your actual auth check
    return !!token;
  };

  React.useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, []);

  const AuthLayout = ({ children }) => {
    return children; // Or add common layout elements here
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<AuthLayout><Signup setIsAuthenticated={setIsAuthenticated} /></AuthLayout>} />
        <Route path="/login" element={<AuthLayout><Login setIsAuthenticated={setIsAuthenticated} /></AuthLayout>} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/protected" : "/login"} />} /> {/* Redirect based on auth */}
        <Route path="/protected" element={isAuthenticated ? <div>Protected Content (You are logged in!)</div> : <Navigate to="/login" />} /> {/* Protected route */}
      </Routes>
    </Router>
  );
};

export default App;