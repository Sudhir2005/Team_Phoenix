import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, CircularProgress, Box } from "@mui/material";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// 📌 Lazy Loading Components
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const MyHabits = lazy(() => import("./components/MyHabits"));
const HabitDetail = lazy(() => import("./components/HabitDetails"));
const FooterNavbar = lazy(() => import("./components/FooterNavbar"));
const MyProfile = lazy(() => import("./components/MyProfile"));
const MyFriends = lazy(() => import("./components/MyFriends"));
const CreateHabit = lazy(() => import("./components/CreateHabit"));
const SpotifyPlaylist = lazy(() => import("./components/SpotifyPlaylist"));
const TaskPlanner = lazy(() => import("./components/TaskPlanner"));
const LandingPage = lazy(() => import("./components/LandingPage"));
const UrgeTracker = lazy(() => import("./components/UrgeTracker"));
const HabitInsights = lazy(() => import("./components/HabitInsights"));
const HabitQuestionnaire = lazy(() => import("./components/HabitQuestionnaire"));
const TaskPlan = lazy(() => import("./components/TaskPlan"));

// ✅ Check if `TaskDetail.jsx` exists
let TaskDetail;
try {
  TaskDetail = lazy(() => import("./components/TaskDetail"));
} catch (error) {
  console.warn("TaskDetail component not found.");
}

// 🎨 Theme Customization
const theme = createTheme({
  palette: {
    primary: { main: "#2E8B57" },
    secondary: { main: "#FF6F61" },
    mode: "dark",
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
        <Suspense fallback={<LoadingScreen />}>
          <AppContent 
            isAuthenticated={isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated} 
            handleLogout={handleLogout} 
          />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

// 📌 Separate Component for Routes & Navigation
function AppContent({ isAuthenticated, setIsAuthenticated, handleLogout }) {
  const location = useLocation();
  const hideFooter = ["/login", "/signup", "/"].includes(location.pathname);

  return (
    <>
      <div style={{ paddingBottom: isAuthenticated && !hideFooter ? "70px" : "0px" }}>
        <Routes>
          {/* 🔥 Authentication Routes */}
          <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

          {/* 🔥 Protected Routes (User Must Be Logged In) */}
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/myhabits" element={<MyHabits />} />
              <Route path="/createhabit" element={<CreateHabit />} />
              <Route path="/myfriends" element={<MyFriends />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/habit/:id" element={<HabitDetail />} />
              <Route path="/spotifyplaylist" element={<SpotifyPlaylist />} />
              <Route path="/habit/taskplanner" element={<TaskPlanner />} />

              {/* ✅ AI-Enhanced Habit Tracking */}
              <Route path="/habit/questionnaire" element={<HabitQuestionnaire />} />
              <Route path="/habit/tasks" element={<TaskPlan />} />

              {/* ✅ Task Detail Route (Only if TaskDetail exists) */}
              {TaskDetail && <Route path="/habit/task/:id" element={<TaskDetail />} />}

              {/* ✅ Additional Features */}
              <Route path="/urge-tracker" element={<UrgeTracker />} />
              <Route path="/habit-insights" element={<HabitInsights />} />

              {/* 🚀 Catch-All Route for Logged-In Users */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            // Redirect non-authenticated users to login
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>

      {/* ✅ Show Footer Navbar only if logged in & not on auth pages */}
      {isAuthenticated && !hideFooter && <FooterNavbar />}
    </>
  );
}

// 📌 Loading Screen Component for Suspense Fallback
const LoadingScreen = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <CircularProgress color="primary" />
  </Box>
);

export default App;
