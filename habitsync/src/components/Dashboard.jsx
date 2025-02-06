import React, { useState, useEffect } from "react";
import {
  Container, Grid, Typography, Card, Avatar, Box, IconButton, LinearProgress, Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemAvatar, Switch, Tooltip
} from "@mui/material";
import { motion } from "framer-motion";
import {
  FaTrophy, FaFire, FaBars, FaQuoteLeft, FaUserFriends, FaCalendarCheck, FaChartBar, FaTasks, FaPlay, FaMoon, FaSun, FaSnowflake, FaMedal
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import FooterNavbar from "../components/FooterNavbar";
import StreakGraph from "../components/StreakGraph";
import CalendarTracker from "../components/CalendarTracker";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navValue, setNavValue] = useState(0);
  const [habitProgress, setHabitProgress] = useState(75);
  const [rewardProgress, setRewardProgress] = useState(40);
  const [streak, setStreak] = useState(5);
  const [quote, setQuote] = useState("Your potential is endless. Keep going!");
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [completedHabits, setCompletedHabits] = useState(0);
  const [goal, setGoal] = useState(3);
  const [darkMode, setDarkMode] = useState(false);
  const [streakFreeze, setStreakFreeze] = useState(1);
  const [achievements, setAchievements] = useState([]);

  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleLeaderboard = () => setLeaderboardOpen(!leaderboardOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const interval = setInterval(() => {
      const quotes = [
        "Your potential is endless. Keep going!",
        "The best time to start was yesterday. The next best time is now.",
        "Success is the sum of small efforts, repeated daily.",
        "You don’t have to be extreme, just consistent.",
        "Every day is a chance to get better.",
      ];
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const completeHabit = () => {
    setCompletedHabits(completedHabits + 1);

    if (completedHabits + 1 === goal) {
      setStreak(streak + 1);
      setCompletedHabits(0); // Reset for the next day

      if (streak === 7) setAchievements([...achievements, "🔥 One Week Streak"]);
      if (streak === 30) setAchievements([...achievements, "🏆 One Month Streak"]);
    }
  };

  const freezeStreak = () => {
    if (streakFreeze > 0) {
      setStreakFreeze(streakFreeze - 1);
      alert("🔥 Streak frozen for today!");
    } else {
      alert("❄️ No more Streak Freezes left!");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", background: darkMode ? "#1A1A1A" : "linear-gradient(135deg, #2C3E50, #4CA1AF)", minHeight: "100vh", color: "#fff" }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <IconButton onClick={toggleSidebar} sx={{ color: "#FFD700" }}>
            <FaBars size={28} />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">HabitSync</Typography>
          <Box display="flex" alignItems="center">
            <Switch checked={darkMode} onChange={toggleDarkMode} />
            {darkMode ? <FaMoon size={24} /> : <FaSun size={24} />}
          </Box>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {/* Streak */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#E67E22", color: "#fff", borderRadius: 4 }}>
                <Typography variant="h6"><FaFire /> Streak: {streak} Days</Typography>
                <Tooltip title="Use Streak Freeze" arrow>
                  <Button startIcon={<FaSnowflake />} onClick={freezeStreak} variant="contained" color="primary" sx={{ mt: 1 }}>
                    Freeze Streak ({streakFreeze} left)
                  </Button>
                </Tooltip>
              </Card>
            </motion.div>
          </Grid>

          {/* Habit Analytics */}
          <Grid item xs={12} md={6}>
            <StreakGraph streak={streak} />
          </Grid>

          {/* Calendar View */}
          <Grid item xs={12} md={6}>
            <CalendarTracker />
          </Grid>

          {/* Achievements */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#9B59B6", color: "#fff", borderRadius: 4 }}>
                <Typography variant="h6"><FaMedal /> Achievements</Typography>
                <List>
                  {achievements.length > 0 ? (
                    achievements.map((achieve, index) => <ListItem key={index}><ListItemText primary={achieve} /></ListItem>)
                  ) : (
                    <Typography>No Achievements Yet!</Typography>
                  )}
                </List>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <FooterNavbar navValue={navValue} setNavValue={setNavValue} />
    </Box>
  );
};

export default Dashboard;
