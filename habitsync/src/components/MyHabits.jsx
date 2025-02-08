import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  LinearProgress,
  Checkbox,
  Card,
  CardContent,
} from "@mui/material";
import { Add, Delete, TrendingUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc, getDocs, collection, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

const MyHabits = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const habitsCollection = collection(db, `users/${user.uid}/habits`);
      const habitDocs = await getDocs(habitsCollection);
      const loadedHabits = habitDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        tasks: doc.data().tasks || [], // Ensure tasks exist
      }));
      setHabits(loadedHabits);
    };

    fetchHabits();
  }, []);

  const handleCreateHabit = async () => {
    if (!newHabit.trim()) return;
    const user = auth.currentUser;
    if (!user) return alert("You must be logged in.");

    setLoadingAI(true);

    try {
      const aiTasks = await generateTaskPlan(newHabit);
      const newHabitData = {
        id: Date.now().toString(),
        name: newHabit,
        tasks: aiTasks.map((task) => ({ description: task, completed: false })),
        progress: 0,
      };

      // ✅ Save to Firestore
      await setDoc(doc(db, `users/${user.uid}/habits`, newHabitData.id), newHabitData);
      setHabits([...habits, newHabitData]);
      setNewHabit("");
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleDeleteHabit = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteDoc(doc(db, `users/${user.uid}/habits`, id));
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const handleTaskCompletion = async (habitId, taskIndex) => {
    const user = auth.currentUser;
    if (!user) return;

    const habitRef = doc(db, `users/${user.uid}/habits`, habitId);

    const habitData = habits.find((habit) => habit.id === habitId);
    if (!habitData) return;

    const updatedTasks = habitData.tasks.map((task, index) =>
      index === taskIndex ? { ...task, completed: !task.completed } : task
    );

    const completedTasks = updatedTasks.filter((task) => task.completed).length;
    const progress = (completedTasks / updatedTasks.length) * 100;

    // ✅ Update Firestore
    await updateDoc(habitRef, { tasks: updatedTasks, progress });

    // ✅ Update local state
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, tasks: updatedTasks, progress } : habit
      )
    );
  };

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        My Habits
      </Typography>

      {/* Habit Input & Add Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <input
          type="text"
          placeholder="Enter new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateHabit}
          startIcon={<Add />}
          disabled={loadingAI}
        >
          {loadingAI ? "Generating..." : "Add"}
        </Button>
      </Box>

      {/* Habit List */}
      {habits.length > 0 ? (
        <List sx={{ width: "100%", maxWidth: 500, margin: "auto", bgcolor: "background.paper", borderRadius: "10px" }}>
          {habits.map((habit) => (
            <Card key={habit.id} sx={{ mb: 2, boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {habit.name}
                </Typography>

                {/* Progress Bar */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <LinearProgress variant="determinate" value={habit.progress} sx={{ flex: 1, mr: 1 }} />
                  <Typography variant="body2">{Math.round(habit.progress)}%</Typography>
                </Box>

                {/* Task List with Checkboxes */}
                <List>
                  {(habit.tasks || []).map((task, index) => (
                    <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleTaskCompletion(habit.id, index)}
                        color="primary"
                      />
                      <ListItemText primary={task.description} sx={{ textDecoration: task.completed ? "line-through" : "none" }} />
                    </ListItem>
                  ))}
                </List>

                {/* Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button
  variant="contained"
  color="success"
  startIcon={<TrendingUp />}
  onClick={() => navigate(`/habit/${habit.id}`, { state: { habitName: habit.name } })} // ✅ Ensures correct name is passed
>
  Track
</Button>

                  <IconButton edge="end" color="error" onClick={() => handleDeleteHabit(habit.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No habits added yet. Start by adding a new habit!
        </Typography>
      )}
    </Box>
  );
};

export default MyHabits;
