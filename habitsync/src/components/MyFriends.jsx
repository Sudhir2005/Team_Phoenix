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
  Button
} from "@mui/material";
import { FaCheckCircle, FaHeart, FaRegHeart, FaCommentDots, FaShare, FaPaperPlane, FaMoon, FaSun, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";

// Dummy Friends & Posts
const connectedFriends = [
  { name: "Elon Musk", avatar: "https://i.imgur.com/Y6l4l5a.jpg", verified: true },
  { name: "Taylor Swift", avatar: "https://i.imgur.com/2KkjPWs.jpg", verified: true },
  { name: "Emma Watson", avatar: "https://i.imgur.com/dy6j1Vq.jpg", verified: true },
];

const dummyPosts = [
  { id: 1, user: "John Doe", avatar: "https://i.imgur.com/I80W1Q0.png", image: "https://i.imgur.com/Kp4vQAk.jpg", caption: "Chilling by the beach! 🌊", likes: 35, comments: 3 },
];

const MyFriends = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  // Handle new post submission
  const handlePost = () => {
    if (newPost.trim() !== "" || newImage) {
      setPosts([
        { id: posts.length + 1, user: "You", avatar: "https://i.imgur.com/I80W1Q0.png", caption: newPost, image: newImage, likes: 0, comments: 0 },
        ...posts,
      ]);
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
      }}
    >
      {/* 🌗 Dark Mode Toggle */}
      <Box display="flex" justifyContent="end" p={2}>
        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
          {darkMode ? <FaSun /> : <FaMoon />}
        </IconButton>
      </Box>

      {/* 🔥 Say Something Card with Image Upload */}
      <motion.div whileHover={{ scale: 1.02 }}>
        <Card
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 3,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            maxWidth: "90%",
            margin: "0 auto",
            border: "2px solid #ff6b81",
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
              sx={{ mt: 2, width: "100%", color: "#ff6b81", border: "1px solid #ff6b81", borderRadius: 2 }}
            >
              <FaImage /> Upload Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            {newImage && <img src={newImage} alt="Preview" style={{ width: "100%", marginTop: "10px", borderRadius: "10px" }} />}
          </CardContent>
        </Card>
      </motion.div>

      {/* 🔥 Connected Friends */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Connected Friends
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {connectedFriends.map((friend, index) => (
          <Grid item key={index}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Badge badgeContent={friend.verified && <FaCheckCircle color="blue" />} overlap="circular">
                <Avatar src={friend.avatar} sx={{ width: 60, height: 60, border: "3px solid #ff6b81" }} />
              </Badge>
              <Typography variant="body2" mt={1}>
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
        <motion.div key={post.id} whileHover={{ scale: 1.02 }}>
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 4, maxWidth: "90%", margin: "0 auto", background: darkMode ? "#222" : "rgba(255, 255, 255, 0.3)", backdropFilter: "blur(10px)" }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar src={post.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
                <Typography variant="h6" fontWeight="bold">
                  {post.user}
                </Typography>
              </Box>
              {post.image && <img src={post.image} alt="Post" style={{ width: "100%", borderRadius: 10, marginTop: 10 }} />}
              <Typography mt={2}>{post.caption}</Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Container>
  );
};

export default MyFriends;
