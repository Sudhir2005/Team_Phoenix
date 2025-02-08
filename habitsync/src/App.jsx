import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, CircularProgress, Box } from "@mui/material";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";  
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import MyHabits from "./components/MyHabits";
import HabitDetail from "./components/HabitDetails"; // ✅ Import HabitDetail page
import FooterNavbar from "./components/FooterNavbar";
import MyProfile from "./components/MyProfile";
import MyFriends from "./components/MyFriends";
import CreateHabit from "./components/CreateHabit";
import SpotifyPlaylist from "./components/SpotifyPlaylist";
import TaskPlanner from "./components/TaskPlanner"; 
import LandingPage from "./components/LandingPage"; 

const theme = createTheme({
  palette: {
    primary: { main: "#2E8B57" },
    secondary: { main: "#FF6F61" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
  };

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
        {/* ✅ Pass setIsAuthenticated to fix the issue */}
        <AppContent 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated} 
          handleLogout={handleLogout} 
        />
      </Router>
    </ThemeProvider>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated, handleLogout }) {
  const location = useLocation();
  const hideFooter = ["/login", "/signup", "/"].includes(location.pathname);

  return (
    <>
      <div style={{ paddingBottom: isAuthenticated && !hideFooter ? "70px" : "0px" }}>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/myhabits" element={isAuthenticated ? <MyHabits /> : <Navigate to="/login" />} />
          <Route path="/createhabit" element={isAuthenticated ? <CreateHabit /> : <Navigate to="/login" />} />
          <Route path="/myfriends" element={isAuthenticated ? <MyFriends /> : <Navigate to="/login" />} />
          <Route path="/myprofile" element={isAuthenticated ? <MyProfile /> : <Navigate to="/login" />} />
          <Route path="/habit/:id" element={isAuthenticated ? <HabitDetail /> : <Navigate to="/login" />} />
          <Route path="/spotifyplaylist" element={isAuthenticated ? <SpotifyPlaylist /> : <Navigate to="/login" />} />
          <Route path="/habit/taskplanner" element={isAuthenticated ? <TaskPlanner /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>

      {isAuthenticated && !hideFooter && <FooterNavbar />}
    </>
  );
}

export default App;
