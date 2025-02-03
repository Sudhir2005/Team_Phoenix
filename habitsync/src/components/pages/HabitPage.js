import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./HabitPage.css"; // Import styles

const HabitPage = () => {
  const { habitId } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulated Habit Data Fetching (Replace with actual API)
  useEffect(() => {
    const fetchHabitData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulating API delay
      const sampleHabit = {
        id: habitId,
        name: "Meditate",
        description: "Practice mindfulness meditation for 10 minutes daily.",
        currentStreak: 7,
        totalCompletions: 50,
        target: 10,
      };
      setHabit(sampleHabit);
      setLoading(false);
    };

    fetchHabitData();
  }, [habitId]);

  if (loading) return <p className="loading">Loading Habit...</p>;
  if (!habit) return <p className="error">Habit Not Found</p>;

  // Function to track completion
  const trackCompletion = () => {
    setHabit((prev) => ({
      ...prev,
      currentStreak: prev.currentStreak + 1,
      totalCompletions: prev.totalCompletions + 1,
    }));
  };

  return (
    <div className="habit-page-container">
      <h1 className="habit-title">{habit.name}</h1>
      <p className="habit-description">{habit.description}</p>

      <div className="habit-stats">
        <div className="stat-box">
          <span className="stat-number">{habit.currentStreak}</span>
          <p>Current Streak</p>
        </div>
        <div className="stat-box">
          <span className="stat-number">{habit.totalCompletions}</span>
          <p>Total Completions</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <p>Progress</p>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${(habit.currentStreak / habit.target) * 100}%` }}></div>
        </div>
      </div>

      {/* Complete Habit Button */}
      <button className="track-button" onClick={trackCompletion}>✔ Mark as Completed</button>
    </div>
  );
};

export default HabitPage;
