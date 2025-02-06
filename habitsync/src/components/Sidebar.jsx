import React from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from "@mui/material";
import { FaFire, FaTrophy, FaBluetoothB, FaMusic, FaInfoCircle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: <FaFire size={20} />, text: "Streak Count", route: "/dashboard" },
    { icon: <FaTrophy size={20} />, text: "Rewards", route: "/dashboard" },
    { icon: <FaBluetoothB size={20} />, text: "Bluetooth", route: "/dashboard" },
    { icon: <FaMusic size={20} />, text: "Playlists", route: "/spotifyplaylist" },
    { icon: <FaInfoCircle size={20} />, text: "About Us", route: "/dashboard" },
  ];

  return (
    <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
      <Box sx={{ width: 250, p: 3, background: "#222", color: "#fff", height: "100vh" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Dashboard Menu</Typography>
          <IconButton onClick={toggleSidebar} sx={{ color: "#fff" }}>
            <FaTimes />
          </IconButton>
        </Box>
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem 
              button 
              key={index} 
              sx={{ color: "#ddd", "&:hover": { background: "#333" } }}
              onClick={() => {
                navigate(item.route);
                toggleSidebar();
              }}
            >
              <ListItemIcon sx={{ color: "#FFD700" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
