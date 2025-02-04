import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CircularProgress,
  
} from "@mui/material";
import { motion } from "framer-motion";
import { FaBookOpen, FaTrophy, FaFire, FaTasks, FaBars, FaTimes, FaUserCircle, FaQuoteLeft } from "react-icons/fa";
import FooterNavbar from "../components/FooterNavbar"; // ✅ Navbar Component

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navValue, setNavValue] = useState(0);
  const [progress, setProgress] = useState(75); // ✅ Habit Progress (Mock)
  const [streak, setStreak] = useState(5); // ✅ Daily Streak Count
  const [quote, setQuote] = useState("Your potential is endless. Keep going!"); // ✅ Motivational Quote

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarItems = [
    { icon: <FaUserCircle size={20} />, text: "Profile" },
    { icon: <FaFire size={20} />, text: "Streak Count" },
    { icon: <FaTrophy size={20} />, text: "Achievements" },
    { icon: <FaTasks size={20} />, text: "Daily Goals" },
    { icon: <FaBookOpen size={20} />, text: "Learning Path" },
  ];

  const cards = [
    { icon: <FaBookOpen color="#FFD700" size={50} />, title: "Continue Learning", text: "Resume your current lesson and earn XP.", button: "Resume" },
    { icon: <FaTrophy color="#FF4500" size={50} />, title: "Leaderboard", text: "Compete with friends and climb the ranks!", button: "View Board" },
    { icon: <FaFire color="#FF6347" size={50} />, title: "Daily Streak", text: "Keep your streak alive by practicing today.", button: "Keep Going!" },
  ];

  const fetchNewQuote = () => {
    const quotes = [
      "Your potential is endless. Keep going!",
      "The best time to start was yesterday. The next best time is now.",
      "Success is the sum of small efforts, repeated daily.",
      "You don’t have to be extreme, just consistent.",
      "Every day is a chance to get better.",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  useEffect(() => {
    const interval = setInterval(fetchNewQuote, 10000); // ✅ Change quote every 10 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #2C3E50, #4CA1AF)", minHeight: "100vh", color: "#fff" }}>
      {/* Sidebar */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 250, p: 3, background: "#222", color: "#fff", height: "100vh" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Dashboard Menu</Typography>
            <IconButton onClick={toggleSidebar} sx={{ color: "#fff" }}>
              <FaTimes />
            </IconButton>
          </Box>
          <List>
            {sidebarItems.map((item, index) => (
              <ListItem button key={index} sx={{ color: "#ddd", "&:hover": { background: "#333" } }}>
                <ListItemIcon sx={{ color: "#FFD700" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 5 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <IconButton onClick={toggleSidebar} sx={{ color: "#FFD700" }}>
            <FaBars size={28} />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">Welcome Back! 🎉</Typography>
          <Avatar sx={{ bgcolor: "#FFD700" }} />
        </Box>

        {/* Progress Rings & Quote */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#2E4053", color: "#fff", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)", borderRadius: 4 }}>
                <CircularProgress variant="determinate" value={progress} size={90} thickness={5} sx={{ color: "#00C853" }} />
                <Typography mt={2} variant="h6">Habit Progress: {progress}%</Typography>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#34495E", color: "#fff", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)", borderRadius: 4 }}>
                <Typography variant="h6"><FaFire /> Streak: {streak} Days</Typography>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#2E4053", color: "#FFD700", borderRadius: 4 }}>
                <Typography variant="h6"><FaQuoteLeft /> {quote}</Typography>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Action Cards */}
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {cards.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ textAlign: "center", p: 3, background: "#1C2833", color: "#fff", borderRadius: 4 }}>
                  <CardContent>
                    <Box mb={2}>{item.icon}</Box>
                    <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                    <Typography color="textSecondary" mb={2}>{item.text}</Typography>
                    <Button variant="contained" sx={{ backgroundColor: "#FFD700", color: "#000" }}>{item.button}</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer Navbar Component */}
      <FooterNavbar navValue={navValue} setNavValue={setNavValue} />
    </Box>
  );
};

export default Dashboard;
