import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const AuthContainer = ({ title, isLogin, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
};

export default AuthContainer;
