import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <List>
      <ListItem button onClick={() => navigate("/dashboard")}>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => navigate("/myhabits")}>
        <ListItemText primary="My Habits" />
      </ListItem>
      <ListItem button onClick={() => navigate("/spotifyplaylist")}> {/* ✅ Fixed the Playlist Button */}
        <ListItemText primary="Playlist" />
      </ListItem>
    </List>
  );
};

export default Sidebar;
