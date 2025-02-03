import React from "react";
import { Box, Grid, Typography, Card, CardContent, Button, useMediaQuery, styled, Container, Avatar } from "@mui/material";
import { FaRocket, FaChartBar, FaRegSmileBeam } from "react-icons/fa";
import { keyframes } from "@emotion/react";

// Animation for hover effects
const hoverAnimation = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
`;

// Create custom Gradient background container
const DashboardWrapper = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  minHeight: "100vh",
  background: "linear-gradient(135deg, #6e7bff, #56ccf2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(3),
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  borderRadius: "12px",
  background: "#ffffff",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[10],
    animation: `${hoverAnimation} 0.3s forwards`,
  },
}));

const CardContentWrapper = styled(CardContent)({
  textAlign: "center",
  fontWeight: "bold",
  paddingBottom: "24px",
  paddingTop: "12px",
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2.5rem",
  color: "#fff",
  marginBottom: theme.spacing(3),
  textAlign: "center",
}));

const Icon = styled("div")({
  fontSize: "3rem",
  marginBottom: "1rem",
  color: "#3f51b5",
  transition: "color 0.3s",
  "&:hover": {
    color: "#56ccf2",
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#3f51b5",
  color: "#fff",
  borderRadius: "8px",
  padding: theme.spacing(1, 4),
  "&:hover": {
    backgroundColor: "#283593",
  },
}));

const ProfileWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "32px",
});

const AvatarWrapper = styled(Avatar)({
  width: "80px",
  height: "80px",
  marginBottom: "16px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

const Dashboard = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <DashboardWrapper>
      {/* Profile Section */}
      <ProfileWrapper>
        <AvatarWrapper src="" alt="Profile Picture" />
        <Typography variant="h4" color="textSecondary" fontWeight="bold">Hello, John Doe!</Typography>
        <Typography variant="body1" color="textSecondary">Welcome back to your dashboard.</Typography>
      </ProfileWrapper>

      {/* Title Section */}
      <Title>Interactive Dashboard</Title>

      {/* Grid Layout for Cards */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContentWrapper>
              <Icon>
                <FaRocket />
              </Icon>
              <Typography variant="h6" color="primary">Start Learning</Typography>
              <Typography variant="body2" color="textSecondary">
                Get started with engaging lessons and fun challenges.
              </Typography>
              <StyledButton variant="contained">Get Started</StyledButton>
            </CardContentWrapper>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContentWrapper>
              <Icon>
                <FaChartBar />
              </Icon>
              <Typography variant="h6" color="primary">Track Progress</Typography>
              <Typography variant="body2" color="textSecondary">
                View your learning progress and accomplishments.
              </Typography>
              <StyledButton variant="contained">View Progress</StyledButton>
            </CardContentWrapper>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContentWrapper>
              <Icon>
                <FaRegSmileBeam />
              </Icon>
              <Typography variant="h6" color="primary">Achievements</Typography>
              <Typography variant="body2" color="textSecondary">
                Celebrate your milestones and keep pushing forward!
              </Typography>
              <StyledButton variant="contained">See Achievements</StyledButton>
            </CardContentWrapper>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Responsive Settings Button */}
      <StyledButton
        variant="contained"
        size={isMobile ? "large" : "medium"}
        onClick={() => alert("Going to the settings...")}
      >
        Settings
      </StyledButton>
    </DashboardWrapper>
  );
};

export default Dashboard;
