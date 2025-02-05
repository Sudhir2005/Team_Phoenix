import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, IconButton, Container, Box } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { db, auth } from "../firebase"; // Import Firestore & Auth
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";

const MyHabits = ({ habits, setHabits }) => {
  useEffect(() => {
    const fetchHabits = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const habitsCollection = collection(db, `users/${user.uid}/habits`);
      const snapshot = await getDocs(habitsCollection);
      const fetchedHabits = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHabits(fetchedHabits);
    };

    fetchHabits();
  }, [setHabits]);

  const handleDeleteHabit = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, `users/${user.uid}/habits`, id)); // Delete from Firestore
      setHabits((prev) => prev.filter((habit) => habit.id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Typography variant="h4" fontWeight="bold" color="#2E8B57">
          My Habits
        </Typography>
      </motion.div>

      <Grid container spacing={4} sx={{ mt: 3 }}>
        {habits.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No habits yet! Create one above. 😊
          </Typography>
        ) : (
          habits.map((habit) => (
            <Grid item xs={12} sm={6} key={habit.id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ background: habit.color, borderRadius: 4, color: "#fff", textAlign: "center", p: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h5">{habit.icon} {habit.name}</Typography>
                    <Typography variant="body2">Category: {habit.category}</Typography>
                    <Typography variant="body2">Start Date: {habit.startDate}</Typography>
                    <Box mt={2}>
                      <IconButton onClick={() => handleDeleteHabit(habit.id)} color="inherit">
                        <FaTrash />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default MyHabits;
