import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
  const [habits, setHabits] = useState(() => {
    return JSON.parse(localStorage.getItem("habits")) || [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ paddingBottom: "70px" }}> {/* Ensure space for footer navbar */}
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/myhabits" element={isAuthenticated ? <MyHabits habits={habits} setHabits={setHabits} /> : <Navigate to="/login" />} />
            <Route path="/createhabit" element={isAuthenticated ? <CreateHabit setHabits={setHabits} /> : <Navigate to="/login" />} />
            <Route path="/myfriends" element={isAuthenticated ? <MyFriends /> : <Navigate to="/login" />} />
            <Route path="/myprofile" element={isAuthenticated ? <MyProfile /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>

        {isAuthenticated && <FooterNavbar />}
      </Router>
    </ThemeProvider>
  );
}

export default App;
