import {
    Typography,
    Button,
    Box,
    TextField,
    InputAdornment,
    Paper,
    Container,
    Link as MuiLink,
  } from "@mui/material"
  import { Search, LocationOn } from "@mui/icons-material"
  import { styled } from "@mui/material/styles"
  import HomeNavbar from "./HomeNavbar";
  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";


  function Home() {
    const [user, setUser] = useState(null); // Initialize as null to distinguish from empty object
    const [showRolePrompt, setShowRolePrompt] = useState(false);
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch("http://localhost:8080/user/auth", {
            credentials: "include",
          });
          
          if (!res.ok) {
            throw new Error("Failed to fetch user");
          }
          
          const data = await res.json();
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
  
          // Check if user needs to select role
          if (data && !data.userType) {
            setShowRolePrompt(true);
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
          // If auth fails, redirect to login
          navigate('/login');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUser();
    }, [navigate]);
  
    useEffect(() => {
      // Only proceed if user is loaded (not null)
      if (user === null) return;
  
      // If user exists but has no type, show prompt (handled in first useEffect)
      if (!user.userType) return;
  
      // Navigate based on user type
      if (user.userType === "Employer") {
        navigate("/employerdashboard");
      } else {
        navigate("/home");
      }
    }, [user, navigate]);
  
    // ... rest of your component code ...
    
    
  
   /* useEffect(() => {
      if (user.userType === null || user.userType === undefined) {
        setShowRolePrompt(true);
      } else {
        navigate('/home');
      }
    }, [user, navigate]);
    
  */
    //const userAvatar = user.profileImage || 'http://localhost:8080/uploads/default-profile.jpg';
  
    
  
    const handleRoleSelection = (selectedRole) => {
      setRole(selectedRole);
    };
  
    const handleSubmitRole = async () => {
      if (!role) return;
      
      try {
        const response = await fetch("http://localhost:8080/user/update-role", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ 
            userId: user?.userId || user?.googleId, 
            userType: role 
          }),
        });
        
        if (!response.ok) {
          throw new Error("Failed to update role");
        }
  
        const updatedUser = { ...user, userType: role };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setShowRolePrompt(false);
  
        // The navigation will be handled by the second useEffect
      } catch (err) {
        console.error("Error submitting role:", err);
      }
    };
    
  
  const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
    "& .MuiInputBase-input": {
      padding: "10px 0",
    },
  })
  
  const SearchButton = styled(Button)({
    backgroundColor: "black",
    color: "white",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#333",
    },
    textTransform: "none",
    padding: "6px 16px",
  })
  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <HomeNavbar />
  
        <Container
          maxWidth="md"
          sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
        >
          <Box sx={{ width: "100%", mt: 8, mb: 16 }}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                borderRadius: "8px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  borderRight: { xs: "none", md: "1px solid #e0e0e0" },
                  borderBottom: { xs: "1px solid #e0e0e0", md: "none" },
                }}
              >
                <StyledTextField
                  fullWidth
                  placeholder="Job Title, keywords, company"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <StyledTextField
                  fullWidth
                  placeholder="City, state, zip code, or &quot;remote&quot;"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <SearchButton
                variant="contained"
                sx={{
                  position: { xs: "relative", md: "absolute" },
                  right: 8,
                  top: { md: "50%" },
                  transform: { md: "translateY(-50%)" },
                  width: { xs: "100%", md: "auto" },
                }}
              >
                Search
              </SearchButton>
            </Paper>
  
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <MuiLink
                href="/build-resume"
                sx={{
                  color: "#4caf50",
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Build Resume
              </MuiLink>
              <Typography component="span" sx={{ mx: 1, color: "text.secondary" }}>
                -
              </Typography>
              <Typography component="span" sx={{ color: "text.secondary" }}>
                Create your professional edge
              </Typography>
            </Box>
          </Box>
          
          {showRolePrompt && (
        <div className="role-prompt-modal">
          <div className="role-prompt-content">
            <h3>What brings you to Jobflex?</h3>
            <p>We want to tailor your experience so you'll feel right at home.</p>
            <div className="role-prompt-buttons">
              <button
                onClick={() => handleRoleSelection('Job Seeker')}
                className={role === 'Job Seeker' ? 'selected' : ''}
              >
                <h4>Job Seeker</h4>
                <p>You can browse and apply for job openings, from internships, work-from-home, part-time, to full-time, all at your convenience.</p>
              </button>
              <button
                onClick={() => handleRoleSelection('Employer')}
                className={role === 'Employer' ? 'selected' : ''}
              >
                <h4>Employer</h4>
                <p>You can post job hirings, manage applications, and connect with applicants.</p>
              </button>
            </div>
            {role && (
              <button className="submit-button" onClick={handleSubmitRole}>
                Submit
              </button>
            )}
          </div>
        </div>
      )}
        </Container>
      </Box>
    )
  }
  
  export default Home;