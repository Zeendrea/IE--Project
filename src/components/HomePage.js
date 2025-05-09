import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import { Grid, Card, Typography, Button, Box } from '@mui/material';
import { TextField } from '@mui/material';
import { InputAdornment, Paper } from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Snackbar, Alert } from '@mui/material';

const StyledTextField = styled(TextField)( {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
  "& .MuiInputBase-input": {
    padding: "4px 0",
  },
});

const SearchButton = styled(Button)( {
  backgroundColor: "black",
  color: "white",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#333",
  },
  textTransform: "none",
  padding: "6px 16px",
});

function HomePage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [showRolePrompt, setShowRolePrompt] = useState(false);
  const [role, setRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    location: ''
  });

  const [appliedFilters, setAppliedFilters] = useState({
    title: '',
    company: '',
    location: ''
  });
  
  const handleApply = async (jobPostId) => {
    if (user.userType !== 'Job Seeker') {
      alert("Only Job Seekers can apply for jobs.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          userId: user.userId,
          jobPostId: jobPostId,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        setSnackbarMessage(result); // Show the message in Snackbar
        setSnackbarOpen(true); // show success message from backend
      } else {
        setSnackbarMessage(result); // Show the message in Snackbar
        setSnackbarOpen(true); // Open the Snackbar
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("An error occurred while applying. Please try again later.");
    }
  };

  const handleSave = async (jobPostId) => {
    if (user.userType !== 'Job Seeker') {
      alert("Only Job Seekers can save jobs.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          userId: user.userId,
          jobPostId: jobPostId,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        setSnackbarMessage(result); // Show the message in Snackbar
        setSnackbarOpen(true); // show success message from backend
      } else {
        alert("Error: " + result);
      }
    } catch (error) {
      console.error("Error saving job:", error);
      alert("An error occurred while saving the job. Please try again later.");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(appliedFilters.title.toLowerCase());
    const companyMatch = job.company.toLowerCase().includes(appliedFilters.company.toLowerCase());
    const locationMatch = job.location.toLowerCase().includes(appliedFilters.location.toLowerCase());

    return (titleMatch || companyMatch) && locationMatch;
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/jobs/all");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    if (!user.name) {
      setShowNamePrompt(true);
    } else if (user.userType === null) {
      setShowRolePrompt(true);
    } else {
      if (user.userType === 'Job Seeker') {
        navigate('/homepage');
      } else if (user.userType === 'Employer') {
        navigate('/providerhome');
      }
    }
  }, [user, navigate]);

  const userAvatar = user.profileImage || 'http://localhost:8080/uploads/default-profile.jpg';

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    navigate('/login');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="homepage">
      <HomeNavbar handleLogout={handleLogout} handleSearch={handleSearch} userAvatar={userAvatar} user={user} />
      <main className="content">
        <div className="info-display-container">
          <div className="greeting" style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
            Welcome, 
            <span
              style={{
                background: 'linear-gradient(90deg, #e0f7e9, #a0f1c3)', // light mint green shades
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginLeft: '5px',
              }}
            >
              {user.name || "User"}!
            </span>
          </div>
          <div className="center-content">
            <p className="welcome-message">
              {hasSearched 
                ? "We're here to help you find the perfect job for you."
                : "Try searching to get started."}
            </p>
          </div>
        </div>
        <Box sx={{ width: "100%" }}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "800px",  // controls overall size
              margin: "0 auto",
              borderRadius: "8px",
              position: "relative",
              overflow: "hidden",
              p: 0.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", flex: 1, borderRight: { xs: "none", md: "1px solid #e0e0e0" }, borderBottom: { xs: "1px solid #e0e0e0", md: "none" }, p: 1 }}>
              <StyledTextField
                fullWidth
                placeholder="Job Title, keywords, company"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", flex: 1, p: 1 }}>
              <StyledTextField
                fullWidth
                placeholder='City, state, zip code, or "remote"'
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
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
              onClick={() => {
                setAppliedFilters(filters);
                setHasSearched(true); 
              }}
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
        </Box>

        {hasSearched && (
          <div className="services-selection-container">
            <Grid container spacing={3}>
              {filteredJobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      p: 2,
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {job.title}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        {job.company} • {job.location}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', height: 20, overflow: 'hidden' }}>
                        {job.description}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        💰 {job.pay} | 🕒 {job.shiftAndSchedule}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, gap: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "black", // Change background to black
                        color: "white", // Ensure text is white
                        borderRadius: 2,
                        height: '45px',
                        width: '100%',
                      }}
                      onClick={() => handleApply(job.id)}
                    >
                      Apply
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "black", // Make the border black
                        color: "black", // Change the text color to black
                        borderRadius: 2,
                        height: '45px',
                        width: '100%',
                      }}
                      onClick={() => handleSave(job.id)} // Trigger save on click
                    >
                      Save
                    </Button>

                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {filteredJobs.length === 0 && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                No jobs found matching your criteria.
              </Typography>
            )}
          </div>
        )}
      </main>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default HomePage;
