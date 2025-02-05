import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"; // Page navigation

const HabitLevels = () => {
  const { state: habit } = useLocation();
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([]);

  const handleCompleteLevel = (level) => {
    if (!completedLevels.includes(level)) {
      setCompletedLevels([...completedLevels, level]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Typography variant="h4" fontWeight="bold" color="#2E8B57">
          {habit.icon} {habit.name} - Levels
        </Typography>
      </motion.div>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 2, mt: 4 }}>
        {Array.from({ length: 23 }, (_, i) => (
          <motion.div key={i} whileHover={{ scale: 1.1 }}>
            <Button
              variant="contained"
              sx={{
                background: completedLevels.includes(i + 1) ? "#FFD700" : "#2196F3",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: "bold",
                borderRadius: "10px",
                width: 60,
                height: 60,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                transition: "0.3s",
                "&:hover": { background: "#4CAF50" },
              }}
              onClick={() => handleCompleteLevel(i + 1)}
            >
              {i + 1}
            </Button>
          </motion.div>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{
          background: "#ff4d4d",
          color: "#fff",
          mt: 4,
          fontWeight: "bold",
          borderRadius: "10px",
        }}
        onClick={() => navigate("/")}
      >
        Back to Habits
      </Button>
    </Container>
  );
};

export default HabitLevels;
