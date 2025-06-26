import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Chip,
  Fade,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';

import {
  BusinessCenter as BusinessCenterIcon,
  LocationOn as LocationOnIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
  ArrowBack as ArrowBackIcon,
  Publish as PublishIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

// Animations
const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(45, 190, 95, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(45, 190, 95, 0.6);
  }
`;

// Styled Components
const HeaderSection = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2DBE5F 0%, #28ab56 100%)',
  color: 'white',
  padding: '3rem 2rem',
  borderRadius: '24px 24px 0 0',
  marginBottom: '0',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
  }
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  borderRadius: '0 0 24px 24px',
  padding: '2rem',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fffe 100%)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
  animation: `${slideInUp} 0.6s ease-out`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(45, 190, 95, 0.15)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderColor: '#2DBE5F',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(45, 190, 95, 0.2)',
    }
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    color: '#555',
    '&.Mui-focused': {
      color: '#2DBE5F',
    }
  }
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(45, 190, 95, 0.15)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderColor: '#2DBE5F',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(45, 190, 95, 0.2)',
    }
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    color: '#555',
    '&.Mui-focused': {
      color: '#2DBE5F',
    }
  }
}));

const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #ffffff 0%, #f9fcfa 100%)',
  border: '1px solid rgba(45, 190, 95, 0.1)',
  marginBottom: '1.5rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(45, 190, 95, 0.15)',
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 700,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
  }
}));

const PublishButton = styled(ActionButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2DBE5F 0%, #28ab56 100%)',
  color: 'white',
  animation: `${pulseGlow} 2s ease-in-out infinite`,
  '&:hover': {
    background: 'linear-gradient(135deg, #28ab56 0%, #259a4d 100%)',
    animation: 'none',
  }
}));

function JobPost() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState([
    "Technology",
    "Healthcare", 
    "Finance",
    "Engineering",
    "Remote",
    "Education",
    "Marketing",
    "Sales",
    "Customer Service",
    "Administration",
    "Hospitality",
    "Retail",
    "Manufacturing",
    "Construction",
    "Transportation",
    "Other"
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    payAmount: '',
    payPeriod: '',
    jobType: '',
    shiftAndSchedule: '',
    description: '',
    category: ''
  });
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Form steps
  const steps = ['Basic Info', 'Job Details', 'Description'];

  // Job types and shift schedule options
  const JOB_TYPES = [
    "Full-time",
    "Part-time", 
    "Temporary",
    "Internship",
    "Freelance",
    "Seasonal"
  ];

  const SHIFT_SCHEDULE_OPTIONS = [
    "Day shift",
    "Night shift",
    "Rotating shift",
    "Fixed shift",
    "Flexible schedule",
    "Weekday only",
    "Weekend availability",
    "8 hour shift",
    "10 hour shift", 
    "12 hour shift",
    "Overtime",
    "Split shift"
  ];

  // Pay period options
  const PAY_PERIODS = [
    "per hour",
    "per day", 
    "per week",
    "per month",
    "per year"
  ];

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setSnackbar({
        open: true,
        message: 'You must be logged in to post a job',
        severity: 'error'
      });
      return;
    }

    try {
      // Combine pay amount and period for the backend
      const payString = formData.payAmount && formData.payPeriod 
        ? `₱${formData.payAmount} ${formData.payPeriod}`
        : '';

      const submitData = {
        ...formData,
        pay: payString
      };

      // Remove the separate payAmount and payPeriod fields
      delete submitData.payAmount;
      delete submitData.payPeriod;

      const response = await fetch(`http://localhost:8080/api/jobs/post?userId=${user.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Job posted successfully! 🎉',
          severity: 'success'
        });
        
        // Reset form after successful submission
        setFormData({
          title: '',
          company: '',
          location: '',
          payAmount: '',
          payPeriod: '',
          jobType: '',
          shiftAndSchedule: '',
          description: '',
          category: ''
        });

        setTimeout(() => {
          navigate('/providerhome');
        }, 2000);

      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to post job');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Technology': '💻',
      'Healthcare': '🏥', 
      'Finance': '💰',
      'Engineering': '⚙️',
      'Education': '📚',
      'Marketing': '📈',
      'Sales': '💼',
      'Remote': '🏠'
    };
    return iconMap[category] || '🔧';
  };

  const getJobTypeColor = (type) => {
    const colorMap = {
      'Full-time': '#2DBE5F',
      'Part-time': '#4CAF50',
      'Temporary': '#FF9800', 
      'Internship': '#2196F3',
      'Freelance': '#9C27B0',
      'Seasonal': '#607D8B'
    };
    return colorMap[type] || '#757575';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9f4 0%, #e8f5e9 100%)' }}>
      <Fade in={true} timeout={800}>
        <Box>
          {/* Header Section */}
          <HeaderSection elevation={0}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <WorkIcon sx={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, position: 'relative', zIndex: 2 }}>
              Post a New Job
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, position: 'relative', zIndex: 2 }}>
              Find the perfect candidate for your team
            </Typography>
          </HeaderSection>

          {/* Form Container */}
          <FormContainer elevation={0}>
            {/* Progress Stepper */}
            <Box sx={{ mb: 4 }}>
              <Stepper activeStep={currentStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel 
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontWeight: 600,
                          color: index <= currentStep ? '#2DBE5F' : '#999'
                        }
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              <SectionCard>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <BusinessCenterIcon sx={{ color: '#2DBE5F', fontSize: 28, mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      Basic Information
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <StyledTextField
                        fullWidth
                        required
                        label="Job Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Senior Software Developer"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BusinessCenterIcon sx={{ color: '#2DBE5F' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <StyledTextField
                        fullWidth
                        required
                        label="Company Name"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Tech Solutions Inc."
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <StyledTextField
                        fullWidth
                        required
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Manila, Philippines"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: '#2DBE5F' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <StyledFormControl fullWidth required>
                        <InputLabel>Job Category</InputLabel>
                        <Select
                          name="category"
                          value={formData.category}
                          label="Job Category"
                          onChange={handleChange}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ marginRight: 8 }}>{getCategoryIcon(selected)}</span>
                              {selected}
                            </Box>
                          )}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: 8 }}>{getCategoryIcon(category)}</span>
                                {category}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </StyledFormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </SectionCard>

              {/* Step 2: Job Details */}
              <SectionCard>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <WorkIcon sx={{ color: '#2DBE5F', fontSize: 28, mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      Job Details
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <StyledTextField
                        fullWidth
                        required
                        label="Salary Range"
                        name="payAmount"
                        value={formData.payAmount}
                        onChange={handleChange}
                        placeholder="e.g. 25,000-35,000"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Typography sx={{ color: '#2DBE5F', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                ₱
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <StyledFormControl fullWidth required>
                        <InputLabel>Period</InputLabel>
                        <Select
                          name="payPeriod"
                          value={formData.payPeriod}
                          label="Period"
                          onChange={handleChange}
                        >
                          {PAY_PERIODS.map((period) => (
                            <MenuItem key={period} value={period}>{period}</MenuItem>
                          ))}
                        </Select>
                      </StyledFormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <StyledFormControl fullWidth required>
                        <InputLabel>Job Type</InputLabel>
                        <Select
                          name="jobType"
                          value={formData.jobType}
                          label="Job Type"
                          onChange={handleChange}
                          renderValue={(selected) => (
                            <Chip 
                              label={selected}
                              size="small"
                              sx={{ 
                                backgroundColor: getJobTypeColor(selected),
                                color: 'white',
                                fontWeight: 600
                              }}
                            />
                          )}
                        >
                          {JOB_TYPES.map((type) => (
                            <MenuItem key={type} value={type}>
                              <Chip 
                                label={type}
                                size="small"
                                sx={{ 
                                  backgroundColor: getJobTypeColor(type),
                                  color: 'white',
                                  fontWeight: 600,
                                  mr: 1
                                }}
                              />
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </StyledFormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <StyledFormControl fullWidth>
                        <InputLabel>Schedule</InputLabel>
                        <Select
                          name="shiftAndSchedule"
                          value={formData.shiftAndSchedule}
                          label="Schedule"
                          onChange={handleChange}
                          startAdornment={
                            <InputAdornment position="start">
                              <ScheduleIcon sx={{ color: '#2DBE5F' }} />
                            </InputAdornment>
                          }
                        >
                          {SHIFT_SCHEDULE_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                          ))}
                        </Select>
                      </StyledFormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </SectionCard>

              {/* Step 3: Description */}
              <SectionCard>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <DescriptionIcon sx={{ color: '#2DBE5F', fontSize: 28, mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      Job Description
                    </Typography>
                  </Box>
                  
                  <StyledTextField
                    fullWidth
                    required
                    multiline
                    rows={8}
                    label="Detailed Job Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the role, responsibilities, requirements, and benefits..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        alignItems: 'flex-start',
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                          <DescriptionIcon sx={{ color: '#2DBE5F' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardContent>
              </SectionCard>

              <Divider sx={{ my: 3 }} />

              {/* Action Buttons */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}>
                <ActionButton
                  variant="outlined"
                  onClick={() => navigate('/providerhome')}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    borderColor: '#2DBE5F',
                    color: '#2DBE5F',
                    '&:hover': {
                      borderColor: '#28ab56',
                      backgroundColor: 'rgba(45, 190, 95, 0.04)',
                    }
                  }}
                >
                  Back to Dashboard
                </ActionButton>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {formData.title && formData.company && formData.category && (
                    <Chip
                      icon={<CheckCircleIcon />}
                      label="Ready to Publish"
                      color="success"
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                  
                  <PublishButton
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<PublishIcon />}
                    disabled={!formData.title || !formData.company || !formData.category}
                  >
                    Publish Job
                  </PublishButton>
                </Box>
              </Box>
            </Box>
          </FormContainer>
        </Box>
      </Fade>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 3,
            fontWeight: 600
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default JobPost;