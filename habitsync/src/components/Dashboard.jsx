import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
    if (!user) {
      // If no user data is found, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      {/* Add dashboard content here */}
    </div>
  );
};

export default Dashboard;
