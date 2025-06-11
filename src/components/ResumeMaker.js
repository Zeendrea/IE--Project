import React, { useState } from 'react';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatIcon from "@mui/icons-material/Chat";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";


const ResumeMaker = () => {
  // Resume sections data
  const resumeSections = [
    { title: "Summary", placeholder: "Your summary will appear here" },
    {
      title: "Personal information",
      placeholder: "Your personal information will appear here",
    },
    {
      title: "Work Experience",
      placeholder: "Your work experience will appear here",
    },
    { title: "Education", placeholder: "Your education will appear here" },
    { title: "Skills", placeholder: "Your skills will appear here" },
    {
      title: "Certifications and Licenses",
      placeholder: "Your certifications and licenses will appear here",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", pb: 10 }}>
        {/* Header */}
        <AppBar
          position="static"
          color="default"
          elevation={4}
          sx={{ boxShadow: "0px -1px 10.9px rgba(0,0,0,0.25)" }}
        >
          <Toolbar>
            <Stack
              direction="row"
              spacing={7}
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <Typography variant="h6" fontWeight="bold" color="#28313b">
                JobFlex
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="#28313b">
                Home
              </Typography>
              <Typography variant="body2" fontWeight="semibold" color="#2dbe5f">
                Build Resume
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={1}>
                <NotificationsIcon />
                <ChatIcon />
                <AccountCircleIcon />
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" fontWeight="semibold" color="#28313b">
                Employer/ Post Job
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Back button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 5,
            ml: 5,
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon />
          <Typography variant="body2" fontWeight="light" sx={{ ml: 1 }}>
            Back
          </Typography>
        </Box>

        {/* User info */}
        <Box sx={{ ml: 15, mt: 5 }}>
          <Typography variant="h4" fontWeight="semibold" fontFamily="Poppins">
            Ezzel Jan Francisco
          </Typography>
          <Typography variant="body1" fontWeight="extralight" sx={{ mt: 1 }}>
            ezzelfrancisco95@gmail.com
          </Typography>
          <Typography variant="body1" fontWeight="extralight">
            Cebu City 6000
          </Typography>
        </Box>

        {/* Resume sections */}
        <Stack spacing={4} sx={{ ml: 15, mt: 5 }}>
          {resumeSections.map((section, index) => (
            <Box key={index} sx={{ width: "600px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="medium"
                  fontFamily="Poppins"
                >
                  {section.title}
                </Typography>
                <AddIcon sx={{ color: "#2dbe5f" }} />
              </Box>
              <Paper
                variant="outlined"
                sx={{
                  mt: 2,
                  p: 1.5,
                  borderRadius: "15px",
                  borderStyle: "dashed",
                  borderColor: "rgba(0,0,0,0.5)",
                }}
              >
                <Typography variant="body1" fontWeight="thin" sx={{ ml: 2 }}>
                  {section.placeholder}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Stack>

        {/* Add more sections */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 15,
            mt: 3,
            cursor: "pointer",
          }}
        >
          <ExpandMoreIcon
            sx={{ color: "#2dbe5f", transform: "rotate(270deg)" }}
          />
          <Typography
            variant="body1"
            fontWeight="medium"
            color="#2dbe5f"
            sx={{ ml: 1 }}
          >
            Add more sections
          </Typography>
        </Box>

        {/* Divider */}
        <Divider sx={{ ml: 15, mt: 3, width: "585px" }} />

        {/* Save button */}
        <Button
          variant="contained"
          sx={{
            ml: 15,
            mt: 5,
            width: "240px",
            height: "64px",
            borderRadius: "20px",
            bgcolor: "#2dbe5f",
            "&:hover": { bgcolor: "#25a552" },
            textTransform: "none",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Save
          </Typography>
        </Button>
      </Container>
    </Box>
  );
};

export default ResumeMaker;
