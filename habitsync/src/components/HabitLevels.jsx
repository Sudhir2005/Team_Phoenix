import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, Card, CardContent } from "@mui/material";
import { generateTaskPlan } from "../gemini"; // AI Generator Function

const HabitDetail = () => {
  const location = useLocation();
  const habitName = location.state?.habitName || "Unknown Habit";
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const generatedTasks = await generateTaskPlan(habitName);
        setTasks(generatedTasks);
      } catch (error) {
        console.error("AI Task Generation Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [habitName]);

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        23-Day Challenge: {habitName}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {tasks.map((task, index) => (
            <Card key={index} sx={{ mb: 2, boxShadow: 2 }}>
              <CardContent>
                <ListItem>
                  <ListItemText primary={`Day ${index + 1}: ${task}`} />
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
};

export default HabitDetail;
