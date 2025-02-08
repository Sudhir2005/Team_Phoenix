import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB5-LbaNgBmE-KKqcdiTnmrdfdSTcDSk9c");

export const generateTaskPlan = async (habitName) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Generate a structured **23-day challenge** to master '${habitName}'.
      Each day should have a **unique, actionable task** that builds progressively.
      Use **exactly this format**:
      Day 1: [Task]
      Day 2: [Task]
      ...
      Day 23: [Task]
    `;

    const result = await model.generateContent(prompt);
    const textResponse = await result.response.text(); // Ensure correct data extraction

    if (!textResponse) throw new Error("AI response is empty");

    return textResponse
      .split("\n")
      .filter((line) => line.startsWith("Day"))
      .slice(0, 23)
      .map((task) => task.trim());
  } catch (error) {
    console.error("❌ AI Error:", error);
    return ["⚠️ AI failed to generate tasks. Please try again!"];
  }
};
