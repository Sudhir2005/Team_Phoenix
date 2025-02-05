import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Container, Typography, Paper, List, ListItem, 
  ListItemText, Checkbox, CircularProgress, Button, LinearProgress 
} from "@mui/material";
import { generateTaskPlan } from "../gemini";

const HabitLevels = () => {
  const location = useLocation();
  const habit = location.state;
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(false);

      const generatedTasks = await generateTaskPlan(habit?.name);

      if (generatedTasks[0].includes("⚠️")) {
        setError(true);
      } else {
        setTasks(generatedTasks);
      }

      setLoading(false);
    };

    fetchTasks();
  }, [habit]);

  // Load completed tasks from LocalStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem(`habit-progress-${habit?.id}`)) || {};
    setCompletedTasks(savedProgress);
  }, [habit]);

  // Handle Task Completion
  const handleTaskCompletion = (index) => {
    const newCompletedTasks = { ...completedTasks, [index]: !completedTasks[index] };
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem(`habit-progress-${habit?.id}`, JSON.stringify(newCompletedTasks));
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>Generating tasks...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">❌ Failed to generate tasks.</Typography>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>🔄 Retry</Button>
      </Container>
    );
  }

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercentage = (completedCount / 23) * 100;

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" color="#2E8B57">
        {habit.icon} {habit.name} - 23-Day Challenge
      </Typography>

      <Typography variant="h6" sx={{ mt: 1, color: "#666" }}>
        Progress: {completedCount} / 23 Tasks Completed 🎯
      </Typography>

      <LinearProgress variant="determinate" value={progressPercentage} sx={{ mt: 2, height: 10, borderRadius: 5 }} />

      <Paper elevation={4} sx={{ p: 3, mt: 4, borderRadius: "15px" }}>
        <Typography variant="h6" fontWeight="bold">📌 Daily Habit Tasks:</Typography>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={!!completedTasks[index]}
                onChange={() => handleTaskCompletion(index)}
              />
              <ListItemText
                primary={`📅 Day ${index + 1}: ${task}`}
                sx={{
                  textDecoration: completedTasks[index] ? "line-through" : "none",
                  color: completedTasks[index] ? "#888" : "#000",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default HabitLevels;
