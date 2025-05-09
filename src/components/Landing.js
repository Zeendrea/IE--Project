import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Paper,
  Container,
  Link as MuiLink,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Search, LocationOn } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import { FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
  "& .MuiInputBase-input": {
    padding: "10px 0",
  },
});

const SearchButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#333",
  },
  textTransform: "none",
  padding: "6px 16px",
});

export default function Landing() {
  const navigate = useNavigate();
  const [titleQuery, setTitleQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jobs/all");
      const data = await response.json();
  
      const filtered = data.filter((job) => {
        const matchesTitleOrCompany =
          job.title.toLowerCase().includes(titleQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(titleQuery.toLowerCase());
  
        const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase());
  
        // Allow empty locationQuery to match all locations
        return matchesTitleOrCompany && (locationQuery === "" || matchesLocation);
      });
  
      setFilteredJobs(filtered);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Container maxWidth="md" sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "100%", mt: 8, mb: 4 }}>
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
            <Box sx={{ display: "flex", alignItems: "center", flex: 1, borderRight: { xs: "none", md: "1px solid #e0e0e0" }, borderBottom: { xs: "1px solid #e0e0e0", md: "none" } }}>
              <StyledTextField
                fullWidth
                placeholder="Job Title, keywords, company"
                value={titleQuery}
                onChange={(e) => setTitleQuery(e.target.value)}
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
                placeholder='City, state, zip code, or "remote"'
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
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
              onClick={handleSearch}
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

        {/* Job Results */}
        <Box sx={{ width: "100%", mt: 4 }}>
          {filteredJobs.length > 0 ? (
            <Grid container spacing={3}>
              {filteredJobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job.id}>
                  <Card>
  <CardContent>
    <Typography variant="h6">{job.title}</Typography>
    <Typography variant="body2" color="text.secondary">
      {job.company} | {job.location}
    </Typography>
    <Typography sx={{ mt: 1 }}>{job.description}</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>
      Pay: {job.pay} | Schedule: {job.shiftAndSchedule}
    </Typography>

    {/* New Buttons Here */}
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      <Button
        variant="contained"
        sx={{ mt: 2, mr: 1 }}
        onClick={() => navigate("/login")}
      >
        Apply
      </Button>
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => navigate("/login")}
      >
        Save
      </Button>
          </Box>
  </CardContent>
</Card>

                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ mt: 2 }} align="center" color="text.secondary">
              No job results yet. Try searching!
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
