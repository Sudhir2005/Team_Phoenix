import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB5-LbaNgBmE-KKqcdiTnmrdfdSTcDSk9c");

export const generateTaskPlan = async (habitName) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Create a structured 23-day challenge to help someone develop the habit of '${habitName}'.
      Each day should have a **unique, small task** that progressively builds the habit.
      Format: "Day X: [Task Description]"
      Example for 'Jogging': 
      - Day 1: Walk for 10 minutes.
      - Day 2: Jog for 5 minutes, then walk for 10 minutes.
      - ...
      Generate exactly 23 days of tasks.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result?.response?.text();

    if (!responseText) throw new Error("No response from AI");

    // Extract tasks properly
    const tasks = responseText
      .split("\n")
      .filter((line) => line.startsWith("Day"))
      .slice(0, 23); // Ensure exactly 23 tasks

    return tasks.length ? tasks : ["⚠️ AI couldn't generate tasks. Try again!"];
  } catch (error) {
    console.error("❌ AI Error:", error);
    return ["⚠️ AI failed to generate tasks. Please try again!"];
  }
};
