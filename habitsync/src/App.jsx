import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { auth } from "./firebase"; // Import Firebase authentication
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import MyHabits from "./components/MyHabits";
import FooterNavbar from "./components/FooterNavbar";
import MyProfile from "./components/MyProfile";
import MyFriends from "./components/MyFriends";
import CreateHabit from "./components/CreateHabit";

const theme = createTheme();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem("habits")) || []);

  // ✅ Persist authentication state across refreshes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  if (loading) return <h2>Loading...</h2>; // Show loading state until authentication is checked

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} habits={habits} setHabits={setHabits} />
      </Router>
    </ThemeProvider>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated, habits, setHabits }) {
  const location = useLocation(); // ✅ Get current page path
  const hideFooter = location.pathname === "/login" || location.pathname === "/signup"; // ✅ Hide footer on login & signup

  return (
    <>
      <div style={{ paddingBottom: "70px" }}> {/* Ensure space for footer navbar */}
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/myhabits" element={isAuthenticated ? <MyHabits habits={habits} setHabits={setHabits} /> : <Navigate to="/login" />} />
          <Route path="/createhabit" element={isAuthenticated ? <CreateHabit setHabits={setHabits} /> : <Navigate to="/login" />} />
          <Route path="/myfriends" element={isAuthenticated ? <MyFriends /> : <Navigate to="/login" />} />
          <Route path="/myprofile" element={isAuthenticated ? <MyProfile /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>

      {/* ✅ Show FooterNavbar only if authenticated and NOT on login/signup */}
      {isAuthenticated && !hideFooter && <FooterNavbar />}
    </>
  );
}

export default App;
