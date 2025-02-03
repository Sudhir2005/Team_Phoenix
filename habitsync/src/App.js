import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './components/pages/Dashboard';
import HabitPage from './components/pages/HabitPage';
import LeaderboardPage from './components/pages/LeaderboardPage';
import Profile from './components/pages/Profile';
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
        {/* Public routes */}
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/habit"
          element={isAuthenticated ? <HabitPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/leaderboard"
          element={isAuthenticated ? <LeaderboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        
        {/* Home Route */}
        <Route
          path="/"
          element={isAuthenticated ? <div>Protected Content (You are logged in!)</div> : <Navigate to="/login" />}
        />
        
        {/* Fallback route if the user visits an unknown route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
