import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar"; 
const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box>
      <Navbar /> {/* Include the Navbar */}

      {/* Error Page Content */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "80vh" }}>
        <Typography variant="h4" color="error" gutterBottom>
          Something Went Wrong!
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          We are sorry, but there was an issue loading the content. Please try again later.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
