import React from "react";
import { Grid, Card, CardContent, Typography, IconButton, Container, Box } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const MyHabits = ({ habits, setHabits }) => {
  const handleDeleteHabit = (id) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: "#333" }}>
        My Habits
      </Typography>

      {habits.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2, color: "#777" }}>
          No habits yet! Create one above. 😊
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {habits.map((habit) => (
            <Grid item xs={12} sm={6} md={4} key={habit.id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  sx={{
                    background: `linear-gradient(135deg, ${habit.color}, #ffffff40)`,
                    borderRadius: 4,
                    color: "#fff",
                    textAlign: "center",
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {habit.icon} {habit.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Category: {habit.category}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Start Date: {habit.startDate}
                    </Typography>
                    <Box mt={2}>
                      <IconButton onClick={() => handleDeleteHabit(habit.id)} sx={{ color: "#fff" }}>
                        <FaTrash />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyHabits;
