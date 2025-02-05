import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { generateTaskPlan } from "../gemini"; // Import AI function

const TaskPlanner = () => {
  const [task, setTask] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateSteps = async () => {
    if (!task.trim()) return;

    setLoading(true);
    const generatedSteps = await generateTaskPlan(task);
    setSteps(generatedSteps);
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" color="#2E8B57">
        AI-Powered Task Guide
      </Typography>

      <TextField
        fullWidth
        label="Enter your task"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        sx={{ my: 2 }}
      />

      <Button variant="contained" onClick={handleGenerateSteps} disabled={loading}>
        {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Generate Steps"}
      </Button>

      {steps.length > 0 && (
        <Paper elevation={4} sx={{ p: 3, mt: 4, borderRadius: "15px" }}>
          <Typography variant="h6" fontWeight="bold">📌 Your Task Plan:</Typography>
          <List>
            {steps.map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.2 }}>
                <ListItem>
                  <ListItemText primary={`✅ ${step}`} />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default TaskPlanner;
