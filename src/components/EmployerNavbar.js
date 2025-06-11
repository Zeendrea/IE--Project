import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './EmployerNavbar.css';
import {Button, Divider} from "@mui/material"
import {
  Box,
  Link as MuiLink,
} from "@mui/material";


function EmployerNavbar() {
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: "white",
        position: "sticky", 
        top: "0",
        backgroundColor: "black",
        zIndex: "1000",
      }}
    >
      {/* Left side: Logo and nav links */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <RouterLink to="/employer" style={{ textDecoration: 'none' }}>
          <Box sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}>Jobflex</Box>
        </RouterLink>
        <Box sx={{ display: "flex", gap: 3 }}>
          <MuiLink href="/employer" underline="none" color="inherit" sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Home
          </MuiLink>
          <MuiLink href="/findresume" underline="none" color="inherit" sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Find Resume
          </MuiLink>
        </Box>
      </Box>

      {/* Right side: icons and extra links */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <div className="navbar-buttons">
        <RouterLink to='/login' className="login-btn">Login</RouterLink>
        <Button
              variant="outlined"
              href="/register"
              sx={{
                borderColor: "white",
                color: "white",
                textTransform: "none",
                borderRadius: "4px",
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Sign up
            </Button>
      </div>
        <Divider orientation="vertical" flexItem sx={{ 
            height: 30, 
            mx: 1,
            color: "white",
            }} 
            />
            <MuiLink
            href="/"
            underline="none"
            color="inherit"
            sx={{ fontSize: "0.875rem", fontWeight: 500, display: { xs: "none", md: "block" } }}
            >
            Find jobs
            </MuiLink>
      </Box>
      </Box>
  );
}

export default EmployerNavbar;
