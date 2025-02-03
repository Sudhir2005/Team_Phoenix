import React, { useState } from "react";
import "./Dashboard.css"; // Import CSS file

const Dashboard = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Meditate", currentStreak: 5, target: 10, completed: false },
    { id: 2, name: "Exercise", currentStreak: 2, target: 7, completed: false },
    { id: 3, name: "Read", currentStreak: 10, target: 20, completed: false },
  ]);
  
  const [newHabit, setNewHabit] = useState("");

  // Function to increase habit streak
  const incrementStreak = (id) => {
    setHabits(habits.map((habit) => 
      habit.id === id 
        ? { ...habit, currentStreak: habit.currentStreak + 1, completed: habit.currentStreak + 1 >= habit.target } 
        : habit
    ));
  };

  // Function to add new habit
  const addHabit = () => {
    if (newHabit.trim() === "") return;
    const newHabitObj = {
      id: habits.length + 1,
      name: newHabit,
      currentStreak: 0,
      target: 10,
      completed: false,
    };
    setHabits([...habits, newHabitObj]);
    setNewHabit(""); // Reset input
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">My Habits</h1>

      {/* Habit Input Form */}
      <div className="habit-form">
        <input
          type="text"
          placeholder="Enter new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>

      <div className="habits-grid">
        {habits.map((habit) => (
          <div key={habit.id} className={`habit-card ${habit.completed ? "completed" : ""}`}>
            <div className="habit-details">
              <h2 className="habit-name">{habit.name}</h2>
              <div className="habit-progress">
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${(habit.currentStreak / habit.target) * 100}%` }}></div>
                </div>
                <span className="progress-text">{habit.currentStreak} / {habit.target}</span>
              </div>
              <button className="streak-btn" onClick={() => incrementStreak(habit.id)}>Increase Streak</button>
              {habit.completed && <span className="badge">🏆 Completed!</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
