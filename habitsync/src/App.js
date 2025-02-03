import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Remove useNavigate
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <div>Protected Content (You are logged in!)</div> : <Navigate to="/login" />}
        />
        <Route
          path="/protected"
          element={isAuthenticated ? <div>Protected Content (You are logged in!)</div> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
