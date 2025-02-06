import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const StreakGraph = ({ streak }) => {
  // Simulated past week streak data
  const data = [
    { day: "Mon", streak: streak - 5 >= 0 ? streak - 5 : 0 },
    { day: "Tue", streak: streak - 4 >= 0 ? streak - 4 : 0 },
    { day: "Wed", streak: streak - 3 >= 0 ? streak - 3 : 0 },
    { day: "Thu", streak: streak - 2 >= 0 ? streak - 2 : 0 },
    { day: "Fri", streak: streak - 1 >= 0 ? streak - 1 : 0 },
    { day: "Sat", streak: streak },
    { day: "Sun", streak: streak + 1 }, // Assume today’s streak will be +1 if completed
  ];

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card sx={{ textAlign: "center", p: 3, background: "#34495E", color: "#FFD700", borderRadius: 4 }}>
        <Typography variant="h6" mb={2}>📊 Weekly Streak Progress</Typography>
        <Box sx={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#666" />
              <XAxis dataKey="day" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line type="monotone" dataKey="streak" stroke="#FFD700" strokeWidth={3} dot={{ r: 5, fill: "#FFD700" }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </motion.div>
  );
};

export default StreakGraph;
