import React, { useState } from "react";
import { TextField, Button, IconButton, Typography, Box, Paper } from "@mui/material";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import AuthContainer from "./AuthContainer"; // Assuming this is a shared wrapper component

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Store user details in localStorage
    localStorage.setItem("user", JSON.stringify({ email, password }));
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    alert("Account created! You can now login.");
  };

  return (
    <AuthContainer title="Sign Up" isLogin={false}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        {error && <Typography variant="body2" color="error" align="center" gutterBottom>{error}</Typography>}
        <form onSubmit={handleSignup}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: <IconButton position="start"><FaEnvelope /></IconButton>
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
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: <IconButton position="start"><FaLock /></IconButton>
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </AuthContainer>
  );
};

export default Signup;
