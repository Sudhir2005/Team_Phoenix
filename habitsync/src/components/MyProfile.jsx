import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaTrophy, FaChartLine, FaMoon, FaSun, FaAward, FaUserEdit, FaCogs, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js Components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Profile = () => {
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("John Doe");
  const [avatar, setAvatar] = useState("https://i.imgur.com/I80W1Q0.png");
  const [openImageUpload, setOpenImageUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  // Dummy User Data
  const user = {
    level: 12,
    xp: 750,
    maxXp: 1000,
    points: 5420,
    achievements: ["First 1000 XP", "5 Weekly Streaks", "Best Performer"],
  };

  // Weekly Work Data (Graph)
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [3, 5, 2, 6, 4, 7, 8],
        backgroundColor: darkMode ? "rgba(255, 99, 132, 0.7)" : "rgba(54, 162, 235, 0.7)",
        borderRadius: 5,
      },
    ],
  };

  // Handle Logout Confirmation
  const handleLogout = () => {
    setOpenLogout(false);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  // Handle Dark Mode Toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  // Handle Profile Picture Upload
  const handleUploadImage = () => {
    if (uploadedImage) {
      setAvatar(uploadedImage);
      setOpenImageUpload(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        textAlign: "center",
        background: darkMode
          ? "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)"
          : "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        paddingBottom: 4,
        borderRadius: 4,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        padding: 3,
      }}
    >
      {/* 🌗 Dark Mode Toggle */}
      <Box display="flex" justifyContent="end" p={2}>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <FaSun /> : <FaMoon />}
        </IconButton>
      </Box>

      {/* Profile Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Avatar
          src={avatar}
          sx={{
            width: 120,
            height: 120,
            mx: "auto",
            mb: 2,
            boxShadow: "0px 0px 15px rgba(255, 99, 132, 0.6)",
            border: "3px solid white",
            cursor: "pointer",
          }}
          onClick={() => setOpenImageUpload(true)}
        />
        <Typography variant="h4" fontWeight="bold">
          {username}
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <FaCogs />
          </IconButton>
        </Typography>

        {/* Settings Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => setOpenImageUpload(true)}>
            <FaUpload style={{ marginRight: 8 }} /> Upload Profile Picture
          </MenuItem>
          <MenuItem>
            <TextField
              variant="outlined"
              size="small"
              label="Change Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </MenuItem>
          <MenuItem>
            <Switch checked={darkMode} onChange={toggleDarkMode} /> Dark Mode
          </MenuItem>
        </Menu>

        {/* XP Progress Bar with Glow */}
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(user.xp / user.maxXp) * 100}
            sx={{
              height: 12,
              borderRadius: 10,
              backgroundColor: darkMode ? "#555" : "#ddd",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ff6b81",
                boxShadow: "0px 0px 10px rgba(255, 99, 132, 0.9)",
              },
            }}
          />
        </Box>

        {/* Points & Achievements */}
        <Typography variant="h6" mt={3} fontWeight="bold">
          <FaTrophy color="gold" /> Points: {user.points}
        </Typography>

        {/* Weekly Work Chart */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight="bold">
            <FaChartLine color="blue" /> Weekly Progress
          </Typography>
          <Bar data={weeklyData} />
        </Box>

        {/* Achievements Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight="bold">
            🏅 Achievements
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            {user.achievements.map((achievement, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }}>
                <Box
                  sx={{
                    p: 1.5,
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FaAward color="orange" size={20} />
                  <Typography variant="body1" fontWeight="bold">
                    {achievement}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Profile;
