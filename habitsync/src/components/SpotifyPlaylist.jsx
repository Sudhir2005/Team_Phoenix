import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { FaSpotify } from "react-icons/fa";

const SpotifyPlaylist = () => {
  const spotifyPlaylists = [
    {
      name: "Gym Motivation Playlist",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh",
    },
    {
      name: "Beast Mode",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP",
    },
    {
      name: "Pump Up",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX6e81LupkkgG",
    },
    {
      name: "Workout Beats",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX5OUjSS1OMgV",
    },
    {
      name: "Cardio Motivation",
      url: "https://open.spotify.com/playlist/37i9dQZF1DWV7EzJMK2FUI",
    },
  ];

  return (
    <Box sx={{ padding: 3, background: "#f4f4f4", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom align="center">
        <FaSpotify size={40} color="#1DB954" /> Spotify Playlists
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {spotifyPlaylists.map((playlist, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{ padding: 3, display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 2, background: "#fff" }}
            >
              <Typography variant="h6">{playlist.name}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={() => window.open(playlist.url, "_blank")}
              >
                Listen on Spotify
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SpotifyPlaylist;
