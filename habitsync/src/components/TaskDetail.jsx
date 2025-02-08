import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, CircularProgress, Box } from "@mui/material";
import { db } from "../firebase"; // ✅ Make sure Firebase is configured
import { doc, getDoc } from "firebase/firestore";

const TaskDetail = () => {
  const { id } = useParams(); // ✅ Get task ID from URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskRef = doc(db, "tasks", id); // 🔥 Change collection name if needed
        const taskSnap = await getDoc(taskRef);

        if (taskSnap.exists()) {
          setTask(taskSnap.data());
        } else {
          console.error("Task not found");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!task) {
    return <Typography variant="h6" color="error" align="center">Task not found.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ maxWidth: 500, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body1">{task.description}</Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>
            Due Date: {task.dueDate || "No deadline"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskDetail;
