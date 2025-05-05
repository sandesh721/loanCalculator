import React from 'react';
import { Box, Typography, Link, Container } from "@mui/material";
import Navbar from "./navbar";


const About = () => {
    return (
        <>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 6 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              About This Project
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              This is a Loan Calculator application built using React and Material UI.
              It features EMI calculations, live exchange rates, and light/dark mode support.
            </Typography>
            <Typography variant="h6">
              🔗 Deployed Link:{" "}
              <Link
                href="https://your-deployed-link.netlify.app"
                target="_blank"
                rel="noopener"
                underline="hover"
                color="primary"
              >
                View Live App
              </Link>
            </Typography>
          </Box>
        </Container>
      </>
    );
};

export default About;