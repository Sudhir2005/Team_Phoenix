import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; // Correct imports
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // useNavigate hook

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
          element={<Signup setIsAuthenticated={setIsAuthenticated} navigate={navigate} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} navigate={navigate} />}
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
