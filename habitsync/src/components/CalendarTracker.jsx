import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { format, isSameDay } from "date-fns";
import "./CalendarTracker.css"; // Custom styling

const CalendarTracker = ({ completedDates = [] }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    // Generate styles for completed days
    const getTileClassName = ({ date }) => {
      return completedDates.some((d) => isSameDay(new Date(d), date)) ? "highlight-day" : "";
    };
  
    return (
      <motion.div whileHover={{ scale: 1.05 }}>
        <Card sx={{ textAlign: "center", p: 3, background: "#2E4053", color: "#FFD700", borderRadius: 4 }}>
          <Typography variant="h6" mb={2}>📅 Habit Completion Calendar</Typography>
          <Box display="flex" justifyContent="center">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={getTileClassName}
            />
          </Box>
          <Typography mt={2}>
            Selected Date: {format(selectedDate, "MMMM d, yyyy")}
          </Typography>
        </Card>
      </motion.div>
    );
  };
  

export default CalendarTracker;
