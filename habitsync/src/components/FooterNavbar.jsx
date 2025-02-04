import React from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { FaHome, FaTasks, FaPlusCircle, FaUsers, FaUser } from "react-icons/fa";

const FooterNavbar = () => {
  const navigate = useNavigate();
  const [navValue, setNavValue] = React.useState(0);

  const handleNavigation = (event, newValue) => {
    setNavValue(newValue);
    const paths = ["/dashboard", "/myhabits", "/createhabit", "/myfriends", "/myprofile"];
    navigate(paths[newValue]);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(135deg, #56ccf2, #2E8B57)",
        boxShadow: "0px -3px 10px rgba(0,0,0,0.2)",
      }}
    >
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={handleNavigation}
        sx={{ background: "transparent" }}
      >
        <BottomNavigationAction label="Home" icon={<FaHome size={22} />} sx={{ color: navValue === 0 ? "#FFD700" : "#fff" }} />
        <BottomNavigationAction label="My Habits" icon={<FaTasks size={22} />} sx={{ color: navValue === 1 ? "#FFD700" : "#fff" }} />
        <BottomNavigationAction label="Create Habit" icon={<FaPlusCircle size={22} />} sx={{ color: navValue === 2 ? "#FFD700" : "#fff" }} />
        <BottomNavigationAction label="My Friends" icon={<FaUsers size={22} />} sx={{ color: navValue === 3 ? "#FFD700" : "#fff" }} />
        <BottomNavigationAction label="Profile" icon={<FaUser size={22} />} sx={{ color: navValue === 4 ? "#FFD700" : "#fff" }} />
      </BottomNavigation>
    </Box>
  );
};

export default FooterNavbar;
