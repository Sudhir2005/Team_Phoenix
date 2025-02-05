import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography, IconButton, Container, Box } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { db, auth } from "../firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Navigation

const MyHabits = ({ habits, setHabits }) => {
  const navigate = useNavigate();

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
      await deleteDoc(doc(db, `users/${user.uid}/habits`, id));
      setHabits((prev) => prev.filter((habit) => habit.id !== id));
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
                <Card
                  sx={{
                    background: `linear-gradient(135deg, ${habit.color}, #1E3A8A)`,
                    borderRadius: "20px",
                    color: "#fff",
                    textAlign: "center",
                    p: 3,
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                  onClick={() => navigate(`/habit/${habit.id}`, { state: habit })}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {habit.icon} {habit.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: "italic", opacity: 0.8 }}>
                      {habit.category} | {habit.startDate}
                    </Typography>
                    <Box mt={2}>
                      <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteHabit(habit.id); }} color="inherit">
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
