import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  IconButton,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaCheckCircle, FaSmile, FaPalette } from "react-icons/fa";
import Picker from "emoji-picker-react";
import dayjs from "dayjs";
import { auth, db } from "../firebase"; // Import Firebase
import { doc, setDoc } from "firebase/firestore";

const CreateHabit = ({ setHabits }) => {
  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [habitIcon, setHabitIcon] = useState("🔥");
  const [habitColor, setHabitColor] = useState("#ff9a9e");
  const [successOpen, setSuccessOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const categories = ["Fitness", "Health", "Productivity", "Mindfulness", "Finance", "Hobbies"];

  const handleCreateHabit = async () => {
    if (!habitName || !category) {
      alert("Please enter a habit name and select a category.");
      return;
    }

    // Ensure the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to create a habit.");
      return;
    }

    const habitId = Date.now().toString(); // Unique habit ID
    const newHabit = {
      id: habitId,
      name: habitName,
      category,
      startDate: startDate.format("YYYY-MM-DD"),
      icon: habitIcon,
      color: habitColor,
    };

    try {
      // Store habit in Firestore under the user's ID
      await setDoc(doc(db, `users/${user.uid}/habits`, habitId), newHabit);

      // Update local state
      setHabits((prev) => [...prev, newHabit]);
      setSuccessOpen(true);

      // Reset form
      setHabitName("");
      setCategory("");
      setStartDate(dayjs());
      setHabitIcon("🔥");
      setHabitColor("#ff9a9e");
    } catch (error) {
      console.error("Error creating habit:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3, background: "#f3f4f6" }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" color="#2E8B57">
              Create a New Habit
            </Typography>

            <TextField
              fullWidth
              label="Habit Name"
              variant="outlined"
              sx={{ mt: 3 }}
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />

            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel>Category</InputLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat, index) => (
                  <MenuItem key={index} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box mt={3} display="flex" justifyContent="center">
              <IconButton color="primary" onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}>
                <FaSmile size={24} />
              </IconButton>
              {emojiPickerOpen && <Picker onEmojiClick={(e, emojiObject) => setHabitIcon(emojiObject.emoji)} />}
            </Box>

            <Box mt={3} display="flex" alignItems="center" justifyContent="center">
              <FaPalette size={24} />
              <input
                type="color"
                value={habitColor}
                onChange={(e) => setHabitColor(e.target.value)}
                style={{ marginLeft: 10, cursor: "pointer", border: "none", width: 40, height: 40 }}
              />
            </Box>

            <motion.div whileHover={{ scale: 1.1 }} style={{ marginTop: "30px" }}>
              <Button variant="contained" color="primary" startIcon={<FaCheckCircle />} onClick={handleCreateHabit}>
                Create Habit
              </Button>
            </motion.div>

            <Snackbar
              open={successOpen}
              autoHideDuration={3000}
              onClose={() => setSuccessOpen(false)}
              message="🎉 Habit Created Successfully!"
            />
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default CreateHabit;
