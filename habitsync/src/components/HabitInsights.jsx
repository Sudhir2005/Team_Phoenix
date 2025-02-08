import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";

const HabitInsights = () => {
  const [habitData, setHabitData] = useState([]);
  const [streaks, setStreaks] = useState([]);
  const [completionRates, setCompletionRates] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch habit tracking data
    const fetchedData = [
      { name: "Exercise", streak: 10, completionRate: 85 },
      { name: "Reading", streak: 7, completionRate: 70 },
      { name: "Meditation", streak: 5, completionRate: 60 },
      { name: "No Junk Food", streak: 3, completionRate: 50 },
      { name: "Sleep Early", streak: 2, completionRate: 40 },
    ];

    setHabitData(fetchedData);
    setStreaks(fetchedData.map((habit) => habit.streak));
    setCompletionRates(fetchedData.map((habit) => habit.completionRate));
  }, []);

  const lineChartData = {
    labels: habitData.map((habit) => habit.name),
    datasets: [
      {
        label: "Streaks (Days)",
        data: streaks,
        fill: false,
        backgroundColor: "#2E8B57",
        borderColor: "#2E8B57",
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: habitData.map((habit) => habit.name),
    datasets: [
      {
        label: "Completion Rate (%)",
        data: completionRates,
        backgroundColor: "#FF6F61",
      },
    ],
  };

  return (
    <Box sx={{ padding: 3, background: "linear-gradient(135deg, #2C3E50, #4CA1AF)", minHeight: "100vh", color: "#fff" }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        📊 Habit Insights
      </Typography>

      <Grid container spacing={3}>
        {/* Streak Progress Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ background: "#2E4053", color: "#fff", borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>🔥 Streak Progress</Typography>
              <Line data={lineChartData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Completion Rate Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ background: "#34495E", color: "#FFD700", borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>✅ Completion Rate</Typography>
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Best & Worst Performing Habits */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ background: "#1ABC9C", color: "#fff", borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6">🏆 Best Performing Habit</Typography>
              <Typography variant="h5">{habitData[0]?.name || "Loading..."}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ background: "#E74C3C", color: "#fff", borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6">⚠️ Needs Improvement</Typography>
              <Typography variant="h5">{habitData[habitData.length - 1]?.name || "Loading..."}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HabitInsights;
