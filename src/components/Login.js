import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';
import Navbar from './Navbar';

function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  /*useEffect(() => {
    const fetchUserInfo = async () => {
        const response = await fetch("http://localhost:8080/user/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('authToken')}`, // or whatever auth method you're using
            },
        });
        
        const userInfo = await response.json();
        console.log(userInfo); // Process user info (e.g., set in state)
    };
    
    fetchUserInfo();
}, []);*/

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    let isValid = true;

    // Validations
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) {
      return;
    }

    const user = {
      email: email,
      password: password
    };

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const result = await response.json();
      console.log(result);

      // Check if result contains a userId (or similar identifier)
      if (result.userId) {
        // Save userId and other necessary info to localStorage
        localStorage.setItem("userId", result.userId); // Store the userId in localStorage
        localStorage.setItem("user", JSON.stringify(result)); // Store the full user data if needed

        alert("Login successful!");
        // Navigate based on userType
        if (result.userType === "Employer") {
          navigate("/providerhome");
        } else {
          navigate("/homepage");
        }
      } else {
        throw new Error("User ID not found in the response");
      }

    } catch (err) {
      setErrorMessage(err.message); // Set error message if login fails
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <Container component="main" maxWidth="xs" className="main-container" sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh", paddingBottom: "100px" }}>
        {/*<Background />*/}
        <Box className="login-box"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontSize: "32px", fontFamily: "Arial", fontWeight: "600", color: "#28313B" }}>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {errorMessage && (
              <Typography variant="body2" color="error">{errorMessage}</Typography>
            )}

            <Grid container justifyContent="flex-end">
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                backgroundColor: "#2DBE5F",
                "&:hover": {
                  backgroundColor: "#28ab56",
                  },
              }}
            >
              Log in
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <RouterLink to="/register" variant="body2" style={{ textDecoration: 'none' }}>
                  {"Don't have an account? Sign Up"}<br></br>
                </RouterLink>
                
              </Grid>
            </Grid>
          </Box>
          <button onClick={handleLogin}>
            Login with Google
          </button>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
