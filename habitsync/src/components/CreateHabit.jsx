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
import { FaCheckCircle, FaSmile, FaPalette, FaBars } from "react-icons/fa";
import Picker from "emoji-picker-react";
import dayjs from "dayjs";
import { auth, db } from "../firebase"; // Firebase imports
import { doc, setDoc } from "firebase/firestore";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar

const CreateHabit = ({ setHabits }) => {
  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [habitIcon, setHabitIcon] = useState("🔥");
  const [habitColor, setHabitColor] = useState("#ff9a9e");
  const [successOpen, setSuccessOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ Sidebar state

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // ✅ Sidebar toggle

  const categories = ["Fitness", "Health", "Productivity", "Mindfulness", "Finance", "Hobbies"];

  const handleCreateHabit = async () => {
    if (!habitName || !category) {
      alert("Please enter a habit name and select a category.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to create a habit.");
      return;
    }

    const habitId = Date.now().toString();
    const newHabit = {
      id: habitId,
      name: habitName,
      category,
      startDate: startDate.format("YYYY-MM-DD"),
      icon: habitIcon,
      color: habitColor,
    };

    try {
      await setDoc(doc(db, `users/${user.uid}/habits`, habitId), newHabit);
      setHabits((prev) => [...prev, newHabit]);
      setSuccessOpen(true);
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
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* ✅ Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Container maxWidth="sm">
        {/* Card with Glassmorphic Effect */}
        <Card
          sx={{
            p: 4,
            borderRadius: 5,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          {/* ✅ Sidebar Toggle Button */}
          <Box display="flex" justifyContent="space-between">
            <IconButton onClick={toggleSidebar} sx={{ color: "#FFD700" }}>
              <FaBars size={24} />
            </IconButton>
          </Box>

          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="h4" fontWeight="bold" color="#FFD700">
              Create a New Habit
            </Typography>

            {/* 📝 Habit Name Input */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <TextField
                fullWidth
                label="Habit Name"
                variant="outlined"
                sx={{ mt: 3, borderRadius: 2 }}
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
              />
            </motion.div>

            {/* 📌 Category Dropdown */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
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
            </motion.div>

            {/* 😃 Emoji Picker */}
            <Box mt={3} display="flex" justifyContent="center">
              <motion.div whileHover={{ scale: 1.2 }}>
                <IconButton color="primary" onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}>
                  <FaSmile size={24} />
                </IconButton>
              </motion.div>

              {emojiPickerOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Picker onEmojiClick={(e, emojiObject) => setHabitIcon(emojiObject.emoji)} />
                </motion.div>
              )}
            </Box>

            {/* 🎨 Color Picker */}
            <Box mt={3} display="flex" alignItems="center" justifyContent="center">
              <motion.div whileHover={{ scale: 1.1 }}>
                <FaPalette size={24} />
              </motion.div>
              <input
                type="color"
                value={habitColor}
                onChange={(e) => setHabitColor(e.target.value)}
                style={{ marginLeft: 10, cursor: "pointer", border: "none", width: 40, height: 40 }}
              />
            </Box>

            {/* 🚀 Create Habit Button */}
            <motion.div whileHover={{ scale: 1.1 }} style={{ marginTop: "30px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#222",
                  fontWeight: "bold",
                  ":hover": { backgroundColor: "#FFC107" },
                }}
                startIcon={<FaCheckCircle />}
                onClick={handleCreateHabit}
              >
                Create Habit
              </Button>
            </motion.div>

            {/* 🎉 Success Snackbar */}
            <Snackbar
              open={successOpen}
              autoHideDuration={3000}
              onClose={() => setSuccessOpen(false)}
              message="🎉 Habit Created Successfully!"
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              TransitionProps={{ in: successOpen, timeout: 300 }}
            />
          </motion.div>
        </Card>
      </Container>
    </Box>
  );
};

export default CreateHabit;
