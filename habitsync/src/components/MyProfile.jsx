import React, { useState, useEffect } from "react";
import { 
  Container, 
  Card, 
  Avatar, 
  Typography, 
  CircularProgress, 
  Button, 
  TextField, 
  Box, 
  IconButton, 
  useTheme 
} from "@mui/material";
import { FaBars, FaUser, FaEnvelope } from "react-icons/fa";
import { auth, db, doc, getDoc, logout } from "../firebase"; 
import { updateProfile } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format, subDays } from "date-fns";
import Sidebar from "./Sidebar"; // Import Sidebar component

const Profile = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [contributions, setContributions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setName(data.name);

            // Fetch contribution data (mocking it for now)
            const mockContributions = generateMockContributions();
            setContributions(mockContributions);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Generate mock contribution data
  const generateMockContributions = () => {
    let days = 180; // Last 6 months
    let contributionData = [];
    for (let i = 0; i < days; i++) {
      contributionData.push({
        date: format(subDays(new Date(), i), "yyyy-MM-dd"),
        count: Math.floor(Math.random() * 5), // Random activity levels (0-5)
      });
    }
    return contributionData;
  };

  // ✅ Update Profile Name
  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), { ...userData, name }, { merge: true });
      setUserData({ ...userData, name });
      setEditMode(false);
    }
  };

  // ✅ Logout Function
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  // ✅ Sidebar Toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
      {/* Sidebar Component */}
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
          {/* Sidebar Toggle Button */}
          <IconButton onClick={toggleSidebar} sx={{ position: "absolute", top: 20, left: 20, color: "#FFD700" }}>
            <FaBars size={24} />
          </IconButton>

          {loading ? (
            <CircularProgress sx={{ my: 4, color: "#FFD700" }} />
          ) : (
            <>
              <Avatar
                src={userData?.profilePic || "https://i.imgur.com/I80W1Q0.png"}
                sx={{
                  width: 130,
                  height: 130,
                  mx: "auto",
                  mb: 2,
                  border: "5px solid #FFD700",
                  boxShadow: "0px 5px 15px rgba(255, 215, 0, 0.5)",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />

              {editMode ? (
                <>
                  <TextField
                    fullWidth
                    label="Update Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 2 }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      background: "#FFD700",
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "#000",
                    }}
                    onClick={handleUpdateProfile}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    onClick={() => setEditMode(false)} 
                    sx={{ ml: 2, color: "#FFD700", textTransform: "none" }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: "#FFD700" }}>
                    {userData?.name || "User"}
                  </Typography>

                  <Typography variant="body1">
                    <FaUser color="#FFD700" /> <strong>Name:</strong> {userData?.name || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <FaEnvelope color="#FFD700" /> <strong>Email:</strong> {userData?.email || "N/A"}
                  </Typography>

                  <IconButton onClick={() => setEditMode(true)} sx={{ mt: 2, color: "#FFD700" }}>
                    <EditIcon />
                  </IconButton>
                </>
              )}

              {/* Contribution Heatmap */}
              <Typography variant="h5" sx={{ mt: 4, fontWeight: "bold", color: "#FFD700" }}>
                Contribution Activity (Last 6 Months)
              </Typography>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <CalendarHeatmap
                  startDate={subDays(new Date(), 180)}
                  endDate={new Date()}
                  values={contributions}
                  classForValue={(value) => {
                    if (!value) return { fill: "#e0e0e0" };
                    const colors = ["#b8e994", "#78e08f", "#38ada9", "#079992"];
                    return { fill: colors[value.count] };
                  }}
                />
              </Box>

              {/* Logout Button */}
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ mt: 3, fontWeight: "bold", textTransform: "none" }}
              >
                Logout
              </Button>
            </>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
