import React, { useState } from "react";
import {
  Box,
  IconButton,
  Divider,
  Link as MuiLink,
  Menu,
  MenuItem,
} from "@mui/material";
import { Notifications, ChatBubbleOutline, Person } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function EmployerNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "black",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
    >
      {/* Left side: Logo and nav links */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <RouterLink to="/providerhome" style={{ textDecoration: 'none' }}>
          <Box sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}>Jobflex</Box>
        </RouterLink>
        <Box sx={{ display: "flex", gap: 3 }}>
          <MuiLink href="/providerhome" underline="none" color="white" sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Home
          </MuiLink>
          <MuiLink href="/find-resume" underline="none" color="white" sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Find Resume
          </MuiLink>
        </Box>
      </Box>

      {/* Right side: Icons and menu */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton size="small">
        <Notifications sx={{ fontSize: 20, color: "white" }} />
        </IconButton>
        <IconButton size="small">
        <ChatBubbleOutline sx={{ fontSize: 20, color: "white" }} />
        </IconButton>
        <IconButton size="small" onClick={handleMenuOpen}>
        <Person sx={{ fontSize: 20, color: "white" }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>Profile</MenuItem>
          <MenuItem onClick={() => { navigate("/my-jobs"); handleMenuClose(); }}>My Jobs</MenuItem>
          <MenuItem onClick={() => { navigate("/settings"); handleMenuClose(); }}>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </Menu>

        <Divider orientation="vertical" flexItem sx={{ height: 24, mx: 1 }} />
        <MuiLink
          href="/"
          underline="none"
          color="white"
          sx={{ fontSize: "0.875rem", fontWeight: 500, display: { xs: "none", md: "block" } }}
        >
          Find Jobs
        </MuiLink>
      </Box>
    </Box>
  );
}
