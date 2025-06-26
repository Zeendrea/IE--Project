import React, { useEffect, useState } from 'react';
import './ProviderHomepage.css';
import { useNavigate } from 'react-router-dom';
import EmployerNav from './EmployerNav';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  Grid, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert,
  Paper,
  Container,
  IconButton,
  Chip,
  Stack,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  Badge,
  Switch,
  FormControlLabel,
  InputAdornment
} from "@mui/material";

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  Schedule as ScheduleIcon,
  Business as BusinessIcon,
  ArrowBack as ArrowBackIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Category as CategoryIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

const API_URL = "http://localhost:8080/api/jobs";

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

const CATEGORIES = [
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
];

// Function to format date and time
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "Recently posted";
  
  try {
    const date = new Date(dateTimeString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return "Recently posted";
    
    // Calculate relative time
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    } else if (diffDays < 7) {
      return diffDays === 1 ? "Yesterday" : `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Recently posted";
  }
};

// Format date for the tooltip
const formatFullDateTime = (dateTimeString) => {
  if (!dateTimeString) return "";
  
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  } catch (error) {
    return "";
  }
};

function ProviderHomePage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [user, setUser] = useState({});
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        company: "",
        location: "",
        pay: "",
        jobType: "",
        shiftAndSchedule: "",
        description: "",
        userId: "",
        status: "OPEN", // Default status for new job
        category: "" // Default category
    });
    const [isEditing, setIsEditing] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [categories, setCategories] = useState(CATEGORIES);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setFormData(prev => ({ ...prev, userId: storedUser.userId }));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (user.userId) {
            fetchJobs();
            // Fetch categories if backend endpoint is ready
            // fetchCategories();
        }
    }, [user]);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/all`);
            const data = await res.json();
            
            // If job doesn't have a status field, add it with a default "OPEN" value
            const jobsWithStatus = data.map(job => ({
                ...job,
                status: job.status || "OPEN",
                category: job.category || "Other"
            }));
            
            setJobs(jobsWithStatus);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setLoading(false);
        }
    };
    
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/categories`);
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser({});
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, userId, ...jobDetails } = formData;

            const url = `${API_URL}/update/${id}?userId=${userId}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobDetails)
            });

            if (!res.ok) {
                throw new Error('Failed to update job');
            }

            const responseText = await res.text();
            setSnackbar({
                open: true,
                message: responseText,
                severity: 'success'
            });
            fetchJobs();
            resetForm();
        } catch (error) {
            console.error("Error updating job:", error);
            setSnackbar({
                open: true,
                message: 'Error updating job: ' + error.message,
                severity: 'error'
            });
        }
    };
    
    // Toggle job status (open/closed)
    const toggleJobStatus = async (job) => {
        try {
            const url = `${API_URL}/toggle-status/${job.id}?userId=${user.userId}`;
            const res = await fetch(url, {
                method: "PUT"
            });

            if (!res.ok) {
                throw new Error('Failed to update job status');
            }

            const response = await res.json();
            
            setSnackbar({
                open: true,
                message: `Job successfully ${response.status.toLowerCase()}`,
                severity: 'success'
            });
            
            // Update local state to avoid refetching
            setJobs(jobs.map(j => 
                j.id === job.id ? { ...j, status: response.status } : j
            ));
        } catch (error) {
            console.error("Error updating job status:", error);
            setSnackbar({
                open: true,
                message: 'Error updating job status: ' + error.message,
                severity: 'error'
            });
        }
    };

    const deleteJob = async (id, userId) => {
        if (window.confirm("Are you sure you want to delete this job posting? This action cannot be undone.")) {
            try {
                const res = await fetch(`${API_URL}/delete/${id}?userId=${userId}`, {
                    method: "DELETE"
                });
                
                if (!res.ok) {
                    throw new Error('Failed to delete job');
                }
                
                const responseText = await res.text();
                setSnackbar({
                    open: true,
                    message: responseText,
                    severity: 'success'
                });
                fetchJobs();
            } catch (error) {
                console.error("Error deleting job:", error);
                setSnackbar({
                    open: true,
                    message: 'Error deleting job: ' + error.message,
                    severity: 'error'
                });
            }
        }
    };

    const editJob = (job) => {
        setFormData({
            id: job.id,
            title: job.title || "",
            company: job.company || "",
            location: job.location || "",
            pay: job.pay || "",
            jobType: job.jobType || "",
            shiftAndSchedule: job.shiftAndSchedule || "",
            description: job.description || "",
            userId: user.userId,
            status: job.status || "OPEN",
            category: job.category || ""
        });
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({
            id: null,
            title: "",
            company: "",
            location: "",
            pay: "",
            jobType: "",
            shiftAndSchedule: "",
            description: "",
            userId: user.userId || "",
            status: "OPEN",
            category: ""
        });
        setIsEditing(false);
    };
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false
        });
    };

    // Get count of user's jobs
    const userJobsCount = jobs.filter(job => job.employer?.userId === user.userId).length;

    // Function to get chip color based on job type
    const getJobTypeColor = (jobType) => {
        switch(jobType) {
            case 'Full-time':
                return { bg: '#e8f5e9', color: '#2e7d32' }; // green
            case 'Part-time':
                return { bg: '#f1f8e9', color: '#558b2f' }; // light green
            case 'Temporary':
                return { bg: '#f9fbe7', color: '#827717' }; // lime
            case 'Internship':
                return { bg: '#e0f2f1', color: '#00695c' }; // teal
            case 'Freelance':
                return { bg: '#e8f5e9', color: '#1b5e20' }; // dark green
            case 'Seasonal':
                return { bg: '#f1f8e9', color: '#33691e' }; // green variant
            default:
                return { bg: '#f5f5f5', color: '#212121' }; // grey
        }
    };

    // Get chip color for job status
    const getStatusColor = (status) => {
        return status === "OPEN" 
            ? { bg: '#e8f5e9', color: '#2e7d32' } // green for open
            : { bg: '#ffebee', color: '#c62828' }; // red for closed
    };
    
    // Get chip color for category
    const getCategoryColor = (category) => {
        switch(category) {
            case 'Technology':
                return { bg: '#e3f2fd', color: '#1976d2' }; // blue
            case 'Healthcare':
                return { bg: '#e8eaf6', color: '#3f51b5' }; // indigo
            case 'Finance':
                return { bg: '#fff8e1', color: '#ffa000' }; // amber
            case 'Engineering':
                return { bg: '#f3e5f5', color: '#9c27b0' }; // purple
            case 'Remote':
                return { bg: '#e0f7fa', color: '#00acc1' }; // cyan
            case 'Education':
                return { bg: '#fce4ec', color: '#e91e63' }; // pink
            default:
                return { bg: '#f5f5f5', color: '#757575' }; // grey
        }
    };

    // Job card component for consistent styling
    const JobCard = ({ job }) => {
        const jobTypeStyle = getJobTypeColor(job.jobType);
        const statusStyle = getStatusColor(job.status);
        const categoryStyle = getCategoryColor(job.category);
        const postedTime = formatDateTime(job.postedDate);
        const fullDateTime = formatFullDateTime(job.postedDate);
        
        return (
            <Paper 
                elevation={2} 
                sx={{ 
                    borderRadius: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: 6
                    }
                }}
            >
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 2 }}>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                {job.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', my: 1, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                    <BusinessIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {job.company}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                    <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {job.location}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip 
                                label={job.status === "OPEN" ? "Open" : "Closed"} 
                                sx={{ 
                                    backgroundColor: statusStyle.bg, 
                                    color: statusStyle.color,
                                    fontWeight: 'medium',
                                    borderRadius: 8
                                }}
                            />
                            <Chip 
                                label={job.jobType} 
                                sx={{ 
                                    backgroundColor: jobTypeStyle.bg, 
                                    color: jobTypeStyle.color,
                                    fontWeight: 'medium',
                                    borderRadius: 8
                                }}
                            />
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CategoryIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                        <Chip 
                            label={job.category || "Other"} 
                            size="small"
                            sx={{ 
                                backgroundColor: categoryStyle.bg, 
                                color: categoryStyle.color,
                                fontWeight: 'medium',
                                borderRadius: 8,
                                ml: 0.5
                            }}
                        />
                        
                        <Tooltip title={fullDateTime} arrow placement="top">
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                <Typography variant="caption" color="text.secondary">
                                    {postedTime}
                                </Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                    
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flex: '1 0 auto'
                        }}
                    >
                        {job.description}
                    </Typography>
                    
                    <Stack direction="row" spacing={1.5} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                        {job.pay && (
                            <Chip 
                                icon={<Typography sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>₱</Typography>} 
                                label={job.pay} 
                                variant="outlined" 
                                size="small" 
                                sx={{ borderRadius: 8 }}
                            />
                        )}
                        {job.shiftAndSchedule && (
                            <Chip 
                                icon={<ScheduleIcon />} 
                                label={job.shiftAndSchedule} 
                                variant="outlined" 
                                size="small"
                                sx={{ borderRadius: 8 }} 
                            />
                        )}
                    </Stack>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        flexWrap: 'wrap', 
                        gap: 2,
                        mt: 'auto'
                    }}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Button
                                variant={job.status === "OPEN" ? "outlined" : "contained"}
                                color={job.status === "OPEN" ? "error" : "success"}
                                startIcon={job.status === "OPEN" ? <ToggleOffIcon /> : <ToggleOnIcon />}
                                onClick={() => toggleJobStatus(job)}
                                size="small"
                                sx={{ borderRadius: 3 }}
                            >
                                {job.status === "OPEN" ? "Close" : "Reopen"}
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => editJob(job)}
                                size="small"
                                sx={{ borderRadius: 3 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => deleteJob(job.id, user.userId)}
                                size="small"
                                sx={{ borderRadius: 3 }}
                            >
                                Delete
                            </Button>
                        </Box>
                        
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<GroupIcon />}
                            onClick={() => navigate(`/job-applicants/${job.id}`)}
                            size="small"
                            sx={{ borderRadius: 3 }}
                        >
                            Applicants
                        </Button>
                    </Box>
                </CardContent>
            </Paper>
        );
    };

    return (
        <div className="employer-dashboard">
            <EmployerNav handleLogout={handleLogout} />
            
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 3, 
                        mb: 4, 
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #000000 0%, #1e2b24 100%)',
                        color: 'white'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Welcome back, {user.name || "User"}!
                            </Typography>
                            <Typography variant="subtitle1">
                                You have {userJobsCount} active job {userJobsCount === 1 ? 'listing' : 'listings'}
                            </Typography>
                        </Box>
                        <Button 
                            variant="contained" 
                            startIcon={<AddIcon />} 
                            onClick={() => navigate("/jobpost")}
                            sx={{ 
                                bgcolor: '#2e7d32', 
                                color: 'white',
                                borderRadius: 3,
                                '&:hover': { 
                                    bgcolor: '#1b5e20'
                                } 
                            }}
                        >
                            Post New Job
                        </Button>
                    </Box>
                </Paper>

                {isEditing ? (
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <IconButton 
                                onClick={resetForm} 
                                sx={{ mr: 2 }}
                                aria-label="Back to job listings"
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h5" fontWeight="bold">
                                Edit Job Listing
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        name="title"
                                        label="Job Title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <WorkIcon color="action" sx={{ mr: 1 }} />,
                                            sx: { borderRadius: 4 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        name="company"
                                        label="Company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <BusinessIcon color="action" sx={{ mr: 1 }} />,
                                            sx: { borderRadius: 4 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        name="location"
                                        label="Location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <LocationIcon color="action" sx={{ mr: 1 }} />,
                                            sx: { borderRadius: 4 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        name="pay"
                                        label="Pay"
                                        value={formData.pay}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        placeholder="e.g. ₱15,000-20,000/month or ₱300-500/day"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Typography sx={{ color: 'action.active', fontWeight: 'bold' }}>
                                                        ₱
                                                    </Typography>
                                                </InputAdornment>
                                            ),
                                            sx: { borderRadius: 4 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl required fullWidth variant="outlined">
                                        <InputLabel id="jobType-label">Job Type</InputLabel>
                                        <Select
                                            labelId="jobType-label"
                                            name="jobType"
                                            value={formData.jobType}
                                            label="Job Type"
                                            onChange={handleChange}
                                            startAdornment={<WorkIcon color="action" sx={{ mr: 1 }} />}
                                            sx={{ borderRadius: 4 }}
                                        >
                                            {JOB_TYPES.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="shiftAndSchedule-label">Shift & Schedule</InputLabel>
                                        <Select
                                            labelId="shiftAndSchedule-label"
                                            name="shiftAndSchedule"
                                            value={formData.shiftAndSchedule}
                                            label="Shift & Schedule"
                                            onChange={handleChange}
                                            startAdornment={<ScheduleIcon color="action" sx={{ mr: 1 }} />}
                                            sx={{ borderRadius: 4 }}
                                        >
                                            {SHIFT_SCHEDULE_OPTIONS.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl required fullWidth variant="outlined">
                                        <InputLabel id="category-label">Job Category</InputLabel>
                                        <Select
                                            labelId="category-label"
                                            name="category"
                                            value={formData.category}
                                            label="Job Category"
                                            onChange={handleChange}
                                            startAdornment={<CategoryIcon color="action" sx={{ mr: 1 }} />}
                                            sx={{ borderRadius: 4 }}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category} value={category}>
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>
                                            Select the most relevant category for your job
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl required fullWidth variant="outlined">
                                        <InputLabel id="status-label">Job Status</InputLabel>
                                        <Select
                                            labelId="status-label"
                                            name="status"
                                            value={formData.status}
                                            label="Job Status"
                                            onChange={handleChange}
                                            sx={{ borderRadius: 4 }}
                                        >
                                            <MenuItem value="OPEN">Open (Accepting Applications)</MenuItem>
                                            <MenuItem value="CLOSED">Closed (Not Accepting Applications)</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            Set to "Closed" when you're no longer accepting applications
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="description"
                                        label="Job Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <Box sx={{ mt: 1.5, mr: 1 }}><DescriptionIcon color="action" /></Box>,
                                            sx: { borderRadius: 4 }
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                                <Button 
                                    variant="outlined" 
                                    color="inherit" 
                                    onClick={resetForm}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary"
                                    startIcon={<EditIcon />}
                                >
                                    Update Job
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                ) : (
                    <>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography variant="h5" fontWeight="bold">
                                Your Job Listings
                            </Typography>
                        </Box>

                        {loading ? (
                            <Box sx={{ py: 4, textAlign: 'center' }}>
                                <Typography>Loading your job listings...</Typography>
                            </Box>
                        ) : jobs.filter((job) => job.employer?.userId === user.userId).length === 0 ? (
                            <Paper 
                                elevation={2} 
                                sx={{ 
                                    p: 4, 
                                    borderRadius: 4, 
                                    textAlign: 'center',
                                    bgcolor: '#f9f9f9',
                                    border: '1px dashed #4caf50'
                                }}
                            >
                                <Box sx={{ mb: 2 }}>
                                    <WorkIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                                    <Typography variant="h6" gutterBottom>
                                        No Job Listings Yet
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                        Create your first job posting to start receiving applications from talented candidates
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<AddIcon />}
                                    onClick={() => navigate("/jobpost")}
                                    size="large"
                                    sx={{ borderRadius: 3 }}
                                >
                                    Post Your First Job
                                </Button>
                            </Paper>
                        ) : (
                            <Grid container spacing={3}>
                                {jobs
                                    .filter((job) => job.employer?.userId === user.userId)
                                    .map((job) => (
                                        <Grid item xs={12} sm={6} key={job.id}>
                                            <JobCard job={job} />
                                        </Grid>
                                    ))}
                            </Grid>
                        )}
                    </>
                )}
            </Container>
            
            {/* Snackbar Notification */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity={snackbar.severity} 
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ProviderHomePage;