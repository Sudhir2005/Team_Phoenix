import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItemAvatar,
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
  FaMedal,
  FaUserFriends,
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
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleLeaderboard = () => setLeaderboardOpen(!leaderboardOpen);

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

  const leaderboardData = [
    { name: "Alice", streak: 10 },
    { name: "Bob", streak: 8 },
    { name: "Charlie", streak: 6 },
    { name: "You", streak: streak },
  ].sort((a, b) => b.streak - a.streak);

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
          {/* Habit Progress */}
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#2E4053", color: "#fff", borderRadius: 4 }}>
                <Typography variant="h6">Habit Progress</Typography>
                <LinearProgress variant="determinate" value={habitProgress} sx={{ margin: "10px 0" }} />
                <Typography mt={2}>{habitProgress}%</Typography>
              </Card>
            </motion.div>
          </Grid>

          {/* Reward Progress */}
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#34495E", color: "#FFD700", borderRadius: 4 }}>
                <Typography variant="h6">Reward Progress</Typography>
                <LinearProgress variant="determinate" value={rewardProgress} sx={{ margin: "10px 0" }} />
                <Typography mt={2}>{rewardProgress}%</Typography>
              </Card>
            </motion.div>
          </Grid>

          {/* Leaderboard */}
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card onClick={toggleLeaderboard} sx={{ cursor: "pointer", textAlign: "center", p: 3, background: "#1ABC9C", color: "#fff", borderRadius: 4 }}>
                <Typography variant="h6"><FaUserFriends /> Leaderboard</Typography>
              </Card>
            </motion.div>
          </Grid>

          {/* Motivational Quote */}
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ textAlign: "center", p: 3, background: "#2E4053", color: "#FFD700", borderRadius: 4 }}>
                <Typography variant="h6"><FaQuoteLeft /> {quote}</Typography>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <FooterNavbar navValue={navValue} setNavValue={setNavValue} />

      {/* Leaderboard Dialog */}
      <Dialog open={leaderboardOpen} onClose={toggleLeaderboard}>
        <DialogTitle sx={{ textAlign: "center", background: "#1ABC9C", color: "#fff" }}>Leaderboard</DialogTitle>
        <DialogContent sx={{ background: "#2C3E50", color: "#fff" }}>
          <List>
            {leaderboardData.map((user, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: index === 0 ? "#FFD700" : "#3498DB" }}>{index + 1}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={`🔥 ${user.streak} Days`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
