import React, { useState, useEffect } from "react";
import { Container, Avatar, Typography } from "@mui/material";
import { FaUser, FaCalendar, FaBirthdayCake } from "react-icons/fa";
import { auth, db, doc, getDoc } from "../firebase"; // ✅ Ensure getDoc is imported

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid)); // ✅ Fetch user data
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Avatar src="https://i.imgur.com/I80W1Q0.png" sx={{ width: 120, height: 120, mx: "auto", mb: 2 }} />

      <Typography variant="h4" fontWeight="bold">{userData?.name || "User"}</Typography>
      <Typography variant="body1"><FaUser color="#2E8B57" /> <strong>Name:</strong> {userData?.name || "N/A"}</Typography>
      <Typography variant="body1"><FaCalendar color="#2E8B57" /> <strong>Age:</strong> {userData?.age || "N/A"}</Typography>
      <Typography variant="body1"><FaBirthdayCake color="#2E8B57" /> <strong>Date of Birth:</strong> {userData?.dob || "N/A"}</Typography>
    </Container>
  );
};

export default Profile;
