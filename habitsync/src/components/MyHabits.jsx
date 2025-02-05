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
      {/* Gradient background animation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        style={{
          background: "linear-gradient(to right, #ff7e5f, #feb47b)", 
          padding: "5px", 
          borderRadius: "10px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Card sx={{ p: 3, borderRadius: 4, boxShadow: 6, background: "linear-gradient(to right, #FDC830, #F37335)" }}>
          <CardContent>
            {/* Gradient Typography */}
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{
                backgroundImage: "linear-gradient(to left, #ff7e5f, #feb47b)", 
                WebkitBackgroundClip: "text", 
                color: "transparent",
                fontSize: "2rem"
              }}
            >
              Create a New Habit
            </Typography>

            {/* Habit Name Field with smooth entry animation */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <TextField
                fullWidth
                label="Habit Name"
                variant="outlined"
                sx={{ mt: 3, backgroundColor: "#fff" }}
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                InputLabelProps={{
                  style: { color: "#ff7e5f" },
                }}
              />
            </motion.div>

            {/* Category Dropdown with animation */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel sx={{ color: "#ff7e5f" }}>Category</InputLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((cat, index) => (
                    <MenuItem key={index} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </motion.div>

            {/* Emoji Picker Icon with Hover Animation */}
            <Box mt={3} display="flex" justifyContent="center">
              <motion.div 
                whileHover={{ scale: 1.2 }} 
                whileTap={{ scale: 0.9 }}
                style={{ color: "#ff7e5f" }}
              >
                <IconButton onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}>
                  <FaSmile size={24} />
                </IconButton>
              </motion.div>

              {emojiPickerOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.3 }}
                >
                  <Picker onEmojiClick={(e, emojiObject) => setHabitIcon(emojiObject.emoji)} />
                </motion.div>
              )}
            </Box>

            {/* Color Picker with Hover Effect */}
            <Box mt={3} display="flex" alignItems="center" justifyContent="center">
              <motion.div whileHover={{ scale: 1.1 }} style={{ color: "#ff7e5f" }}>
                <FaPalette size={24} />
              </motion.div>
              <input
                type="color"
                value={habitColor}
                onChange={(e) => setHabitColor(e.target.value)}
                style={{
                  marginLeft: 10,
                  cursor: "pointer",
                  border: "none",
                  width: 40,
                  height: 40,
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                  borderRadius: "50%",
                }}
              />
            </Box>

            {/* Create Habit Button with Hover Scaling Animation */}
            <motion.div whileHover={{ scale: 1.1 }} style={{ marginTop: "30px" }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<FaCheckCircle />} 
                onClick={handleCreateHabit}
                sx={{
                  backgroundColor: "#ff7e5f",
                  ":hover": { backgroundColor: "#feb47b" },
                }}
              >
                Create Habit
              </Button>
            </motion.div>

            {/* Success Snackbar with Slide-Up Animation */}
            <Snackbar
              open={successOpen}
              autoHideDuration={3000}
              onClose={() => setSuccessOpen(false)}
              message="🎉 Habit Created Successfully!"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              TransitionProps={{ in: successOpen, timeout: 300 }}
            />
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default CreateHabit;
