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
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaFire,
  FaBars,
  FaTimes,
  FaQuoteLeft,
  FaMusic,
  FaBluetoothB,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FooterNavbar from "../components/FooterNavbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navValue, setNavValue] = useState(0);
  const [habitProgress, setHabitProgress] = useState(75);
  const [rewardProgress, setRewardProgress] = useState(40);
  const [streak, setStreak] = useState(5);
  const [quote, setQuote] = useState("Your potential is endless. Keep going!");
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarItems = [
    { icon: <FaFire size={20} />, text: "Streak Count", route: "/dashboard" },
    { icon: <FaTrophy size={20} />, text: "Rewards", route: "/dashboard" },
    { icon: <FaBluetoothB size={20} />, text: "Bluetooth", route: "/dashboard" },
    { icon: <FaMusic size={20} />, text: "Playlists", route: "/spotifyplaylist" },
    { icon: <FaInfoCircle size={20} />, text: "About Us", route: "/dashboard" },
  ];

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #2C3E50, #4CA1AF)", minHeight: "100vh", color: "#fff" }}>
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
              <ListItem 
                button 
                key={index} 
                sx={{ color: "#ddd", "&:hover": { background: "#333" } }}
                onClick={() => {
                  navigate(item.route);
                  toggleSidebar();
                }}
              >
                <ListItemIcon sx={{ color: "#FFD700" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <IconButton onClick={toggleSidebar} sx={{ color: "#FFD700" }}>
            <FaBars size={28} />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">HabitSync</Typography>
          <Avatar sx={{ bgcolor: "#FFD700" }} />
        </Box>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#2E4053", color: "#fff", borderRadius: 4 }}>
                <Typography variant="h6">Habit Progress</Typography>
                <LinearProgress variant="determinate" value={habitProgress} sx={{ margin: "10px 0" }} />
                <Typography mt={2}>{habitProgress}%</Typography>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#34495E", color: "#fff", borderRadius: 4 }}>
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
      </Container>

      <FooterNavbar navValue={navValue} setNavValue={setNavValue} />
    </Box>
  );
};

export default Dashboard;
