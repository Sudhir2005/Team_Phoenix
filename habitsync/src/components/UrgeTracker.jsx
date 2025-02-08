import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { FaClock, FaTimes, FaMedal, FaChartLine } from "react-icons/fa";
import moment from "moment";

const UrgeTracker = () => {
  const [urgeLog, setUrgeLog] = useState([]);
  const [showUrgeModal, setShowUrgeModal] = useState(false);
  const [currentUrge, setCurrentUrge] = useState(null);
  const [timer, setTimer] = useState(null);
  const [xpPoints, setXpPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  // Load saved urges from localStorage
  useEffect(() => {
    const savedUrges = JSON.parse(localStorage.getItem("urgeLog")) || [];
    const savedXP = parseInt(localStorage.getItem("xpPoints"), 10) || 0;
    const savedStreak = parseInt(localStorage.getItem("streak"), 10) || 0;
    
    setUrgeLog(savedUrges);
    setXpPoints(savedXP);
    setStreak(savedStreak);
  }, []);

  // Save urges to localStorage
  useEffect(() => {
    localStorage.setItem("urgeLog", JSON.stringify(urgeLog));
    localStorage.setItem("xpPoints", xpPoints.toString());
    localStorage.setItem("streak", streak.toString());
  }, [urgeLog, xpPoints, streak]);

  // Log a new urge
  const handleNewUrge = () => {
    const newUrge = {
      id: Date.now(),
      time: moment().format("hh:mm A"),
      date: moment().format("YYYY-MM-DD"),
      status: "Pending",
    };

    setCurrentUrge(newUrge);
    setShowUrgeModal(true);
    startDelayTimer();
  };

  // Start the 10-minute timer for urge resistance
  const startDelayTimer = () => {
    let timeLeft = 10 * 60; // 10 minutes in seconds
    setTimer(timeLeft);

    const interval = setInterval(() => {
      timeLeft -= 1;
      setTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  // Mark urge as successfully resisted
  const resistUrge = () => {
    if (currentUrge) {
      setUrgeLog([
        ...urgeLog,
        { ...currentUrge, status: "Resisted" },
      ]);
      setXpPoints(xpPoints + 10);
      setStreak(streak + 1);
    }
    setShowUrgeModal(false);
    setCurrentUrge(null);
  };

  // Mark urge as failed (user gave in)
  const giveInToUrge = () => {
    if (currentUrge) {
      setUrgeLog([
        ...urgeLog,
        { ...currentUrge, status: "Given In" },
      ]);
      setStreak(0); // Reset streak
    }
    setShowUrgeModal(false);
    setCurrentUrge(null);
  };

  return (
    <Box sx={{ p: 3, textAlign: "center", background: "#1E2A38", color: "#fff", borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>🔥 Urge Tracker</Typography>
      
      <Button variant="contained" color="secondary" onClick={handleNewUrge}>
        Log an Urge
      </Button>

      <Card sx={{ mt: 3, p: 2, background: "#2C3E50", color: "#fff" }}>
        <CardContent>
          <Typography variant="h6"><FaChartLine /> Progress</Typography>
          <Typography>XP: {xpPoints} | Streak: {streak} Days</Typography>
          <LinearProgress variant="determinate" value={(streak / 7) * 100} sx={{ mt: 1 }} />
        </CardContent>
      </Card>

      <Card sx={{ mt: 3, p: 2, background: "#34495E", color: "#fff" }}>
        <CardContent>
          <Typography variant="h6">Past Urges</Typography>
          <List>
            {urgeLog.slice(0, 5).map((urge, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: urge.status === "Resisted" ? "#27AE60" : "#E74C3C" }}>
                    {urge.status === "Resisted" ? <FaMedal /> : <FaTimes />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={urge.status} secondary={`${urge.time} on ${urge.date}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Urge Resistance Modal */}
      <Dialog open={showUrgeModal} onClose={() => setShowUrgeModal(false)}>
        <DialogTitle sx={{ background: "#1ABC9C", color: "#fff" }}>Resist the Urge!</DialogTitle>
        <DialogContent sx={{ background: "#2C3E50", color: "#fff", textAlign: "center" }}>
          <Typography variant="h6">🕰️ Hold on for {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</Typography>
          <Typography sx={{ mt: 2 }}>Try these distractions:</Typography>
          <ul>
            <li>🚶 Take a short walk</li>
            <li>💧 Drink a glass of water</li>
            <li>📝 Write about how you feel</li>
            <li>🎧 Listen to calming music</li>
          </ul>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
            <Button variant="contained" color="success" onClick={resistUrge}>Resisted!</Button>
            <Button variant="contained" color="error" onClick={giveInToUrge}>Gave In</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UrgeTracker;
