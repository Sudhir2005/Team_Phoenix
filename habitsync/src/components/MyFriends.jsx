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
  Switch,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FaCheckCircle, FaHeart, FaRegHeart, FaCommentDots, FaShare, FaPaperPlane, FaMoon, FaSun, FaImage, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

// Dummy Data
const contacts = [
  { name: "Elon Musk", phone: "+123456789", avatar: "https://i.imgur.com/Y6l4l5a.jpg" },
  { name: "Taylor Swift", phone: "+987654321", avatar: "https://i.imgur.com/2KkjPWs.jpg" },
  { name: "Emma Watson", phone: "+111223344", avatar: "https://i.imgur.com/dy6j1Vq.jpg" },
  { name: "Sam Smith", phone: "+555999888", avatar: "https://i.imgur.com/4NzFzMb.jpg" },
];

const dummyPosts = [
  { id: 1, user: "John Doe", avatar: "https://i.imgur.com/I80W1Q0.png", image: "https://i.imgur.com/Kp4vQAk.jpg", caption: "Chilling by the beach! 🌊", likes: 35, comments: 3 },
  { id: 2, user: "Elon Musk", avatar: "https://i.imgur.com/Y6l4l5a.jpg", image: "https://i.imgur.com/tiIuUbd.jpg", caption: "Exploring Mars! 🚀", likes: 50, comments: 10 },
  { id: 3, user: "Taylor Swift", avatar: "https://i.imgur.com/2KkjPWs.jpg", image: "https://i.imgur.com/QtMk75J.jpg", caption: "On stage tonight! 🎤", likes: 100, comments: 15 },
];

const MyFriends = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [contactsList, setContactsList] = useState(contacts);
  const [connectedFriends, setConnectedFriends] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Handle new post submission
  const handlePost = () => {
    if (newPost.trim() !== "" || newImage) {
      setPosts([{
        id: posts.length + 1,
        user: "You",
        avatar: "https://i.imgur.com/I80W1Q0.png",
        caption: newPost,
        image: newImage,
        likes: 0,
        comments: 0
      }, ...posts]);
      setNewPost("");
      setNewImage(null);
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Connect to friend
  const connectToFriend = (friend) => {
    if (!connectedFriends.some(f => f.phone === friend.phone)) {
      setConnectedFriends([...connectedFriends, friend]);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        textAlign: "center",
        background: darkMode ? "#121212" : "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        paddingBottom: 4,
        borderRadius: 5,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)"
      }}
    >
      {/* 🌗 Dark Mode Toggle */}
      <Box display="flex" justifyContent="end" p={2}>
        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
          {darkMode ? <FaSun /> : <FaMoon />}
        </IconButton>
      </Box>

      {/* 🔥 Say Something Card with Image Upload */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Card
          sx={{
            mb: 4,
            p: 3,
            borderRadius: 3,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            maxWidth: "90%",
            margin: "0 auto",
            border: "2px solid #ff6b81",
            transition: "0.3s ease-in-out",
            ":hover": {
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)"
            }
          }}
        >
          <CardContent>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              placeholder="Say something..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                color: darkMode ? "#000" : "#333"
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                      <IconButton color="primary" onClick={handlePost}>
                        <FaPaperPlane />
                      </IconButton>
                    </motion.div>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              component="label"
              sx={{
                mt: 2,
                width: "100%",
                color: "#ff6b81",
                border: "1px solid #ff6b81",
                borderRadius: 2,
                backgroundColor: darkMode ? "#333" : "#fff",
                ":hover": { backgroundColor: "#ff6b81", color: "#fff" }
              }}
            >
              <FaImage /> Upload Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            {newImage && <img src={newImage} alt="Preview" style={{ width: "100%", marginTop: "10px", borderRadius: "10px", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }} />}
          </CardContent>
        </Card>
      </motion.div>

      {/* 🔥 Contacts List */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Contacts
      </Typography>
      <List sx={{ maxHeight: 300, overflowY: "auto" }}>
        {contactsList.map((contact, index) => (
          <ListItem key={index}>
            <Avatar src={contact.avatar} sx={{ width: 40, height: 40, mr: 2 }} />
            <ListItemText
              primary={contact.name}
              secondary={contact.phone}
              sx={{ color: darkMode ? "#fff" : "#000" }}
            />
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => connectToFriend(contact)}
              sx={{ fontSize: 12 }}
            >
              <FaUserPlus /> Connect
            </Button>
          </ListItem>
        ))}
      </List>

      {/* 🔥 Connected Friends */}
      <Typography variant="h6" fontWeight="bold" mt={5} mb={2}>
        Connected Friends
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {connectedFriends.map((friend, index) => (
          <Grid item key={index}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Badge badgeContent={<FaCheckCircle color="blue" />} overlap="circular">
                <Avatar src={friend.avatar} sx={{ width: 60, height: 60, border: "3px solid #ff6b81" }} />
              </Badge>
              <Typography variant="body2" mt={1} sx={{ fontWeight: "bold" }}>
                {friend.name}
              </Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* 🔥 Feeds Section */}
      <Typography variant="h6" fontWeight="bold" mt={5} mb={2}>
        Feeds
      </Typography>
      {posts.map((post) => (
        <motion.div key={post.id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Card sx={{
            mb: 3,
            borderRadius: 3,
            boxShadow: 4,
            maxWidth: "90%",
            margin: "0 auto",
            background: darkMode ? "#222" : "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(10px)",
            transition: "0.3s ease-in-out",
            ":hover": {
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)"
            }
          }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar src={post.avatar} sx={{ width: 50, height: 50, mr: 2, border: "2px solid #ff6b81" }} />
                <Typography variant="h6" fontWeight="bold">
                  {post.user}
                </Typography>
              </Box>
              {post.image && <img src={post.image} alt="Post" style={{ width: "100%", borderRadius: 10, marginTop: 10, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }} />}
              <Typography mt={2}>{post.caption}</Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Container>
  );
};

export default MyFriends;
