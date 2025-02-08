import React, { useState } from "react";
import {
  Container,
  TextField,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
  Grid,
  Badge,
  InputAdornment,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { 
  FaBars, FaCheckCircle, FaPaperPlane, FaMoon, FaSun, 
  FaImage, FaUserPlus, FaHeart, FaRegHeart 
} from "react-icons/fa";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";  // ✅ Import Sidebar Component

const contacts = [
  { name: "Elon Musk", phone: "+123456789", avatar: "https://i.imgur.com/Y6l4l5a.jpg" },
  { name: "Taylor Swift", phone: "+987654321", avatar: "https://i.imgur.com/2KkjPWs.jpg" },
  { name: "Emma Watson", phone: "+111223344", avatar: "https://i.imgur.com/dy6j1Vq.jpg" },
  { name: "Sam Smith", phone: "+555999888", avatar: "https://i.imgur.com/4NzFzMb.jpg" },
];

const dummyPosts = [
  { id: 1, user: "John Doe", avatar: "https://i.imgur.com/I80W1Q0.png", image: "https://i.imgur.com/Kp4vQAk.jpg", caption: "Chilling by the beach! 🌊", likes: 35 },
  { id: 2, user: "Elon Musk", avatar: "https://i.imgur.com/Y6l4l5a.jpg", image: "https://i.imgur.com/tiIuUbd.jpg", caption: "Exploring Mars! 🚀", likes: 50 },
  { id: 3, user: "Taylor Swift", avatar: "https://i.imgur.com/2KkjPWs.jpg", image: "https://i.imgur.com/QtMk75J.jpg", caption: "On stage tonight! 🎤", likes: 100 },
];

const MyFriends = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [connectedFriends, setConnectedFriends] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);  // ✅ Sidebar State

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);  // ✅ Toggle Sidebar

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* ✅ Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            borderRadius: 5,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          {/* ✅ Sidebar Toggle Button */}
          <Box display="flex" justifyContent="space-between">
            <IconButton onClick={toggleSidebar} sx={{ color: "#FFD700" }}>
              <FaBars size={24} />
            </IconButton>
            <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ color: "#FFD700" }}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </IconButton>
          </Box>

          {/* 📝 Create Post */}
          <TextField
            fullWidth
            multiline
            variant="outlined"
            placeholder="Say something..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            sx={{ mt: 2, backgroundColor: "#fff", borderRadius: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={() => {
                    if (newPost.trim() || newImage) {
                      setPosts([{ id: posts.length + 1, user: "You", avatar: "https://i.imgur.com/I80W1Q0.png", caption: newPost, image: newImage, likes: 0 }, ...posts]);
                      setNewPost("");
                      setNewImage(null);
                    }
                  }}>
                    <FaPaperPlane />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            component="label"
            sx={{
              mt: 2,
              color: "#FFD700",
              border: "2px solid #FFD700",
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            <FaImage /> Upload Image
            <input type="file" hidden onChange={(e) => setNewImage(URL.createObjectURL(e.target.files[0]))} />
          </Button>
          {newImage && <img src={newImage} alt="Preview" style={{ width: "100%", marginTop: "10px", borderRadius: "10px" }} />}

          {/* 📞 Contacts List */}
          <Typography variant="h5" sx={{ mt: 4, fontWeight: "bold", color: "#FFD700" }}>
            Contacts
          </Typography>
          <List>
            {contacts.map((contact, index) => (
              <ListItem key={index}>
                <Avatar src={contact.avatar} sx={{ width: 40, height: 40, mr: 2 }} />
                <ListItemText primary={contact.name} secondary={contact.phone} sx={{ color: "#fff" }} />
                <Button variant="outlined" color="inherit" size="small" sx={{ borderColor: "#FFD700", color: "#FFD700" }}>
                  <FaUserPlus /> Connect
                </Button>
              </ListItem>
            ))}
          </List>

          {/* 🏆 Connected Friends */}
          <Typography variant="h5" sx={{ mt: 4, fontWeight: "bold", color: "#FFD700" }}>
            Connected Friends
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {connectedFriends.map((friend, index) => (
              <Grid item key={index}>
                <Badge badgeContent={<FaCheckCircle color="blue" />} overlap="circular">
                  <Avatar src={friend.avatar} sx={{ width: 60, height: 60, border: "3px solid #FFD700" }} />
                </Badge>
                <Typography variant="body2" mt={1} sx={{ fontWeight: "bold", color: "#FFD700" }}>
                  {friend.name}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* 📰 Feeds Section */}
          <Typography variant="h5" sx={{ mt: 4, fontWeight: "bold", color: "#FFD700" }}>
            Feeds
          </Typography>
          {posts.map((post) => (
            <Card key={post.id} sx={{ mt: 3, background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)", borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar src={post.avatar} sx={{ width: 50, height: 50, mr: 2, border: "2px solid #FFD700" }} />
                  <Typography variant="h6" sx={{ color: "#FFD700" }}>{post.user}</Typography>
                </Box>
                <Typography sx={{ mt: 2 }}>{post.caption}</Typography>
                {post.image && <img src={post.image} alt="Post" style={{ width: "100%", marginTop: 10, borderRadius: 10 }} />}
              </CardContent>
            </Card>
          ))}
        </Card>
      </Container>
    </Box>
  );
};

export default MyFriends;
