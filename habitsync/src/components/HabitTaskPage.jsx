import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const HabitTaskPage = () => {
  const location = useLocation();
  const { tasks, habitName } = location.state || { tasks: [], habitName: "Unknown Habit" };

  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {habitName} - 23-Day Challenge
      </Typography>
      {tasks.length === 0 ? (
        <Typography>No tasks found. Please generate again.</Typography>
      ) : (
        <Box>
          {tasks.map((task, index) => (
            <Typography key={index} variant="h6" sx={{ mb: 1 }}>
              {task}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HabitTaskPage;
