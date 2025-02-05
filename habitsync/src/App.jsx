import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, CircularProgress, Box } from "@mui/material";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import MyHabits from "./components/MyHabits";
import HabitLevels from "./components/HabitLevels"; // ✅ Added Habit Levels
import FooterNavbar from "./components/FooterNavbar";
import MyProfile from "./components/MyProfile";
import MyFriends from "./components/MyFriends";
import CreateHabit from "./components/CreateHabit";
import SpotifyPlaylist from "./components/SpotifyPlaylist"; // Import SpotifyPlaylist Component

const theme = createTheme({
  palette: {
    primary: { main: "#2E8B57" }, // Custom theme color
    secondary: { main: "#FF6F61" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

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

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress color="primary" />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} habits={habits} setHabits={setHabits} />
      </Router>
    </ThemeProvider>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated, habits, setHabits }) {
  const location = useLocation();
  const hideFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      <div style={{ paddingBottom: "70px" }}>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/myhabits" element={isAuthenticated ? <MyHabits habits={habits} setHabits={setHabits} /> : <Navigate to="/login" />} />
          <Route path="/createhabit" element={isAuthenticated ? <CreateHabit setHabits={setHabits} /> : <Navigate to="/login" />} />
          <Route path="/myfriends" element={isAuthenticated ? <MyFriends /> : <Navigate to="/login" />} />
          <Route path="/myprofile" element={isAuthenticated ? <MyProfile /> : <Navigate to="/login" />} />
          <Route path="/habit/:id" element={isAuthenticated ? <HabitLevels /> : <Navigate to="/login" />} /> {/* ✅ Habit Levels Route */}
          <Route path="/spotifyplaylist" element={isAuthenticated ? <SpotifyPlaylist /> : <Navigate to="/login" />} /> {/* Spotify Playlist Route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>

      {/* ✅ Show FooterNavbar only if authenticated and NOT on login/signup */}
      {isAuthenticated && !hideFooter && <FooterNavbar />}
    </>
  );
}

export default App;
