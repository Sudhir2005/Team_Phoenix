import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const TaskPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tasks, habitName } = location.state || {}; // ✅ Destructure safely

  console.log("📌 Received in TaskPlan:", location.state); // ✅ Log full received state
  console.log("📌 Extracted Tasks:", tasks); // ✅ Ensure tasks exist

  if (!tasks || tasks.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          No tasks available. Please generate again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {habitName} - 23-Day Challenge
      </Typography>

      {tasks.map((task, index) => (
        <Card key={index} sx={{ mb: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">{`Day ${index + 1}`}</Typography>
            <Typography variant="body1">{task}</Typography>
          </CardContent>
        </Card>
      ))}

      <Button 
        variant="contained" 
        fullWidth 
        color="primary" 
        sx={{ mt: 3 }} 
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default TaskPlan;
