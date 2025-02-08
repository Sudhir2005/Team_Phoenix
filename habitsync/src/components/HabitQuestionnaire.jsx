import React, { useState, useEffect } from "react";
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio, CircularProgress } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

// ✅ Replace with your actual API key (Ensure it's stored securely)
const API_KEY = "AIzaSyB5-LbaNgBmE-KKqcdiTnmrdfdSTcDSk9c";
const genAI = new GoogleGenerativeAI(API_KEY);

const HabitQuestionnaire = ({ habitName }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🟠 Updated Questions in UI:", questions);
  }, [questions]);

  // ✅ Generate Habit Questions
  const generateQuestions = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Generate 5 multiple-choice questions (MCQs) to assess a user's behavior and psychology towards the habit '${habitName}'. Each question should have 4 answer options. 
      
      Format: 
      1. Question text
         a) Option 1
         b) Option 2
         c) Option 3
         d) Option 4`;

      const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });

      const textResponse = await result.response.text();
      console.log("🔵 Raw AI Response:", textResponse);

      if (!textResponse) throw new Error("AI response is empty");

      // ✅ Parse AI Response into Questions
      const lines = textResponse.split("\n").filter(line => line.trim() !== "");
      console.log("🔵 Split Lines:", lines);

      const parsedQuestions = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^\d+\./)) {
          parsedQuestions.push({
            question: lines[i].replace(/^\d+\.\s*/, ""),
            options: [lines[i + 1], lines[i + 2], lines[i + 3], lines[i + 4]].map(opt =>
              opt.replace(/^[a-d]\)\s*/, "")
            ),
          });
          i += 4; // Skip options
        }
      }

      console.log("✅ Parsed Questions:", parsedQuestions);
      setQuestions(parsedQuestions);
    } catch (error) {
      console.error("❌ AI Error:", error);
      setQuestions([{ question: "Failed to generate questions. Try again later.", options: [] }]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Answer Selection
  const handleAnswerSelect = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  // ✅ Submit Answers & Generate 23-Day Plan
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Based on these answers about their habit '${habitName}', generate a structured 23-day challenge. Each day should have a unique, actionable task that builds progressively.
      
      User Answers:
      ${questions.map((q, i) => `${q.question} - ${answers[i] || "No Answer"}`).join("\n")}
      
      **Important**: Only return the tasks in this format:
      Day 1: [Task]
      Day 2: [Task]
      ...
      Day 23: [Task]`;

      const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
      const textResponse = await result.response.text();

      if (!textResponse) throw new Error("AI response is empty");

      console.log("🔵 Raw AI Response:", textResponse); // ✅ Log response

      // ✅ Improved Task Extraction Logic
      const taskList = textResponse
        .split("\n")
        .filter((line) => /^Day \d+:/.test(line)) // ✅ Match correct format
        .map((task) => task.trim());

      console.log("✅ Extracted Tasks:", taskList); // ✅ Log extracted tasks

      if (taskList.length === 0) throw new Error("No tasks were extracted");

      // ✅ Navigate with tasks
      navigate("/habit/tasks", { state: { tasks: taskList, habitName } });

    } catch (error) {
      console.error("❌ AI Task Generation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {habitName} - Habit Assessment
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : questions?.length === 0 ? (
        <Button variant="contained" onClick={generateQuestions}>
          Generate Questions
        </Button>
      ) : (
        <Box>
          {questions.map((q, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6">{q.question}</Typography>
              <RadioGroup value={answers[index] || ""} onChange={(e) => handleAnswerSelect(index, e.target.value)}>
                {q.options.map((option, i) => (
                  <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </Box>
          ))}
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
          >
            Generate 23-Day Plan
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HabitQuestionnaire;
