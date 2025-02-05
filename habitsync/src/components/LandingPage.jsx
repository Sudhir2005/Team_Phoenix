// LandingPage.jsx
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      height: '100vh', 
      textAlign: 'center', 
      background: 'linear-gradient(135deg, #FF6F61, #2E8B57)', 
      padding: '20px'
    }}>
      <Typography variant="h2" color="white" sx={{ fontWeight: 'bold', mb: 3 }}>
        Welcome to Our Platform!
      </Typography>
      <Typography variant="h5" color="white" sx={{ mb: 5 }}>
        Unlock your potential, track your progress, and achieve your goals!
      </Typography>
      <Button variant="contained" color="primary" onClick={goToLogin} sx={{ mb: 2 }}>
        Login
      </Button>
      <Button variant="outlined" color="secondary" onClick={goToSignup}>
        Sign Up
      </Button>
    </Box>
  );
};

export default LandingPage;
