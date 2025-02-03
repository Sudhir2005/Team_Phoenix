import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { TextField, Button, IconButton, Typography, Paper } from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";
import AuthContainer from "./AuthContainer"; // Assuming this is a shared wrapper component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Check if email and password are provided
    if (email && password) {
      // Store user details in localStorage
      localStorage.setItem("user", JSON.stringify({ email, password }));

      // Navigate to the dashboard after successful login
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      setError("Please enter both email and password!"); // Display error if fields are empty
    }
  };

  return (
    <AuthContainer title="Login" isLogin={true}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        {error && <Typography variant="body2" color="error" align="center" gutterBottom>{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: <IconButton position="start"><FaUser /></IconButton>
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: <IconButton position="start"><FaLock /></IconButton>
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </AuthContainer>
  );
};

export default Login;
