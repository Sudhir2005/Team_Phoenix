import React, { createContext, useState, useEffect } from "react";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    return JSON.parse(localStorage.getItem("habits")) || [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit }}>
      {children}
    </HabitContext.Provider>
  );
};

export default HabitContext;
