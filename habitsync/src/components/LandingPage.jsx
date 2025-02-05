import React, { useEffect, useRef, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min.js";

const LandingPage = () => {
  const navigate = useNavigate();
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE,
          skyColor: 0x68b8d7, // ⚫ Pure Black Sky
          cloudColor: 0xadc1de, // 🔴 Red Clouds
          cloudShadowColor: 0x183550, // Darker Red Shadows
          sunColor: 0xff9919, // Deep Red Sunlight Effect
          sunGlareColor: 0xff6633, 
          sunlightColor:0xff9933,
          speed: 1, 
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <Box
      ref={vantaRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Overlay Content */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Rajdhani, sans-serif",
            textTransform: "uppercase",
            letterSpacing: 3,
            mb: 2,
            fontWeight: "bold",
            color: "#00FF7F", // 🟢 Neon Green
            textShadow: "4px 4px 15px rgba(0, 255, 127, 0.9)", // Glowing Effect
          }}
        >
          HabitSync
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: "500",
            fontStyle: "italic",
            color: "#E0E0E0", // Soft White-Gray
            opacity: 0.9,
            mb: 4,
          }}
        >
          Elevate Your Habits
        </Typography>

        {/* 🚀 Glowing Login Button */}
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            background: "radial-gradient(circle, rgba(0,255,127,1) 0%, rgba(0,128,64,1) 100%)",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            px: 6,
            py: 1.8,
            mb: 2,
            borderRadius: "50px",
            transition: "all 0.3s",
            boxShadow: "0px 0px 20px rgba(0, 255, 127, 0.8)",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0px 0px 30px rgba(0, 255, 127, 1)",
            },
          }}
        >
          Login 🚀
        </Button>

        {/* ✨ Stunning Sign Up Button */}
        <Button
          variant="outlined"
          onClick={() => navigate("/signup")}
          sx={{
            border: "2px solid #00FF7F",
            color: "#00FF7F",
            fontSize: "18px",
            fontWeight: "bold",
            px: 6,
            py: 1.8,
            borderRadius: "50px",
            transition: "all 0.3s",
            boxShadow: "0px 0px 15px rgba(0, 255, 127, 0.6)",
            "&:hover": {
              background: "#00FF7F",
              color: "#000",
              transform: "scale(1.1)",
              boxShadow: "0px 0px 25px rgba(0, 255, 127, 1)",
            },
          }}
        >
          Sign Up ✨
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
