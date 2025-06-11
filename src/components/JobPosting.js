import React from "react";
import { useNavigate } from 'react-router-dom';
import ArrowBack from "@mui/icons-material/ArrowBack";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Navbar from './EmployerNavbar';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";



const JobPosting = () => {
  // Mock data for selects
  const jobRoles = [];
  const salaryOptions = [];
  const vacancyOptions = [];
  const jobLevelOptions = [];
  const countryOptions = [];
  const cityOptions = [];
  const navigate = useNavigate();


  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      {/* Header */}
      
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBack />}
          sx={{
            mt: 2,
            mb: 2,
            color: "text.primary",
            fontWeight: 300,
            textTransform: "none",
          }}
          onClick={() => navigate('/employer')}
        >
          Back
        </Button>

        {/* Page title */}
        <Box sx={{ mb: 6, mt: 2 }}>
          <Typography
            variant="h4"
            fontWeight="semibold"
            color="text.primary"
            gutterBottom
          >
            Post a job
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Find the best talent for your company
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" sx={{ mb: 6 }}>
          {/* Job Title */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Job Title
            </Typography>
            <TextField
              fullWidth
              placeholder="Add job title, role vacancies etc"
              variant="outlined"
              sx={{ mb: 3 }}
            />
          </Box>

          {/* Tags and Job Role */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Tags
              </Typography>
              <TextField
                fullWidth
                placeholder="Job keyword, tags etc.."
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Job Role
              </Typography>
              <Select
                fullWidth
                displayEmpty
                renderValue={() => "Select..."}
                IconComponent={KeyboardArrowDown}
              >
                {jobRoles.map((role, index) => (
                  <MenuItem key={index} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          {/* Salary */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Salary
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Min Salary
                </Typography>
                <Select
                  fullWidth
                  displayEmpty
                  renderValue={() => "Minimum Salary..."}
                  IconComponent={KeyboardArrowDown}
                >
                  {salaryOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Max Salary
                </Typography>
                <Select
                  fullWidth
                  displayEmpty
                  renderValue={() => "Maximum Salary..."}
                  IconComponent={KeyboardArrowDown}
                >
                  {salaryOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ mt: 3 }}>
                  <Select
                    fullWidth
                    displayEmpty
                    renderValue={() => "Select..."}
                    IconComponent={KeyboardArrowDown}
                  >
                    {/* Currency options would go here */}
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Vacancies and Job Level */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Vacancies
              </Typography>
              <Select
                fullWidth
                displayEmpty
                renderValue={() => "Select..."}
                IconComponent={KeyboardArrowDown}
              >
                {vacancyOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Job Level
              </Typography>
              <Select
                fullWidth
                displayEmpty
                renderValue={() => "Select..."}
                IconComponent={KeyboardArrowDown}
              >
                {jobLevelOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          {/* Location */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Location
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Country
                </Typography>
                <Select
                  fullWidth
                  displayEmpty
                  renderValue={() => "Select..."}
                  IconComponent={KeyboardArrowDown}
                >
                  {countryOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  City
                </Typography>
                <Select
                  fullWidth
                  displayEmpty
                  renderValue={() => "Select..."}
                  IconComponent={KeyboardArrowDown}
                >
                  {cityOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Box>

          {/* Job Description */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Job Description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              placeholder="Add your description..."
              variant="outlined"
            />
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "black",
              borderRadius: "20px",
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: "#333",
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Post Job
            </Typography>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default JobPosting;
