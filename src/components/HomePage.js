import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import { 
  Grid, 
  Card, 
  Typography, 
  Button, 
  Box, 
  TextField,
  InputAdornment, 
  Paper, 
  Snackbar, 
  Alert,
  Chip,
  CardContent,
  Divider,
  Avatar,
  IconButton,
  Skeleton,
  Container,
  Tooltip,
  Fade
} from '@mui/material';
import { 
  Search, 
  LocationOn, 
  BusinessCenter, 
  AttachMoney, 
  Schedule, 
  BookmarkBorder,
  KeyboardArrowRight,
  Work,
  Category as CategoryIcon,
  School as EducationIcon,
  HealthAndSafety as HealthcareIcon,
  AccountBalance as FinanceIcon,
  Engineering as EngineeringIcon,
  Computer as TechnologyIcon,
  Storefront as RetailIcon,
  AccessTime,
  Home as HomeIcon,
  GraduationCap,
  Laptop,
  Heart,
  TrendingUp,
  Build,
  Apps as ThLarge,
  Star,
  TrendingDown
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

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

// Styled Components
const WelcomeSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #000000 0%, #1e2b24 100%)',
  color: 'white',
  padding: '3rem',
  borderRadius: '20px',
  marginBottom: '3rem',
  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  animation: `${slideInUp} 0.8s ease-out`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(45,190,95,0.1) 0%, rgba(45,190,95,0) 70%)',
    borderRadius: '50%',
    animation: `${float} 8s ease-in-out infinite`,
  }
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 800,
  marginBottom: '1rem',
  background: 'linear-gradient(45deg, #2DBE5F, #28ab56)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  position: 'relative',
  zIndex: 2,
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  }
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: '2rem',
  marginBottom: '3rem',
  border: '1px solid rgba(45, 190, 95, 0.1)',
  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
  position: 'relative',
  zIndex: 2,
  animation: `${slideInUp} 0.8s ease-out 0.2s backwards`,
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  background: 'white',
  border: '2px solid rgba(45, 190, 95, 0.1)',
  borderRadius: '20px',
  padding: '2rem',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
  height: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(45,190,95,0.05), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    borderColor: 'rgba(45, 190, 95, 0.3)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    '&::before': {
      left: '100%',
    },
    '& .category-button': {
      opacity: 1,
      transform: 'translateY(0)',
    }
  }
}));

const BrowseAllCard = styled(CategoryCard)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2DBE5F, #28ab56)',
  color: 'white',
  borderColor: 'rgba(45, 190, 95, 0.3)',
  '& .category-button': {
    background: 'white',
    color: '#2DBE5F',
    opacity: 1,
    transform: 'translateY(0)',
    '&:hover': {
      background: 'rgba(255,255,255,0.9)',
    }
  }
}));

const CategoryButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2DBE5F, #28ab56)',
  color: 'white',
  border: 'none',
  padding: '0.8rem 1.5rem',
  borderRadius: '10px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  opacity: 0,
  transform: 'translateY(20px)',
  textTransform: 'none',
}));

const StatsBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '3rem',
  background: 'white',
  padding: '2rem',
  borderRadius: '20px',
  marginBottom: '3rem',
  boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
  border: '1px solid rgba(45, 190, 95, 0.1)',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '1.5rem',
    textAlign: 'center',
  }
}));

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'fixed',
  background: 'rgba(45,190,95,0.05)',
  borderRadius: '50%',
  animation: `${float} 10s ease-in-out infinite`,
  pointerEvents: 'none',
  zIndex: 0,
}));

// Function to format date and time
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "Recently posted";
  
  try {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return "Recently posted";
    
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

// Get category icon
const getCategoryIcon = (category) => {
  switch(category?.toLowerCase()) {
    case 'technology':
      return <TechnologyIcon sx={{ fontSize: '3rem', color: '#2DBE5F', mb: 1 }} />;
    case 'healthcare':
      return <HealthcareIcon sx={{ fontSize: '3rem', color: '#2DBE5F', mb: 1 }} />;
    case 'finance':
      return <FinanceIcon sx={{ fontSize: '3rem', color: '#2DBE5F', mb: 1 }} />;
    case 'engineering':
      return <EngineeringIcon sx={{ fontSize: '3rem', color: '#2DBE5F', mb: 1 }} />;
    case 'education':
      return <EducationIcon sx={{ fontSize: '3rem', color: '#2DBE5F', mb: 1 }} />;
    case 'remote':
      return <HomeIcon sx={{ fontSize: '3rem', color: '#2DBE5F', mb: 1 }} />;
    case 'retail':
      return <RetailIcon sx={{ fontSize: '3rem', color: '#2DBE5F', mb: 1 }} />;
    default:
      return <BusinessCenter sx={{ fontSize: '3rem', color: '#2DBE5F', mb: 1 }} />;
  }
};

// Get color scheme for category
const getCategoryColor = (category) => {
  switch(category) {
    case 'Technology':
      return { bg: '#e3f2fd', color: '#1976d2' };
    case 'Healthcare':
      return { bg: '#e8eaf6', color: '#3f51b5' };
    case 'Finance':
      return { bg: '#fff8e1', color: '#ffa000' };
    case 'Engineering':
      return { bg: '#f3e5f5', color: '#9c27b0' };
    case 'Remote':
      return { bg: '#e0f7fa', color: '#00acc1' };
    case 'Education':
      return { bg: '#fce4ec', color: '#e91e63' };
    default:
      return { bg: '#f5f5f5', color: '#757575' };
  }
};

// Enhanced job card component
const JobCard = ({ job, selected, onClick }) => {
  const getJobTypeColor = (jobType) => {
    switch(jobType) {
      case 'Full-time':
        return { bg: '#e8f5e9', color: '#2e7d32' };
      case 'Part-time':
        return { bg: '#f1f8e9', color: '#558b2f' };
      case 'Temporary':
        return { bg: '#f9fbe7', color: '#827717' };
      case 'Internship':
        return { bg: '#e0f2f1', color: '#00695c' };
      case 'Freelance':
        return { bg: '#e8f5e9', color: '#1b5e20' };
      case 'Seasonal':
        return { bg: '#f1f8e9', color: '#33691e' };
      default:
        return { bg: '#e3f2fd', color: '#1976d2' };
    }
  };

  const relativeTime = formatDateTime(job.postedDate);
  const jobTypeStyle = getJobTypeColor(job.jobType || 'Full-time');
  const categoryStyle = getCategoryColor(job.category || 'Other');

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        p: 0,
        cursor: 'pointer',
        borderRadius: 3,
        boxShadow: selected ? 4 : 1,
        borderLeft: selected ? '4px solid #2DBE5F' : 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {job.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <BusinessCenter sx={{ fontSize: 16, mr: 0.5 }} />
              {job.company}
            </Typography>
          </Box>
          <Chip 
            size="small" 
            label={job.jobType || "Full-time"} 
            sx={{ 
              backgroundColor: jobTypeStyle.bg,
              color: jobTypeStyle.color,
              fontWeight: 'bold',
              borderRadius: 2
            }} 
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {job.location}
          </Typography>
        </Box>

        {job.category && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CategoryIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
            <Chip
              size="small"
              label={job.category}
              sx={{
                backgroundColor: categoryStyle.bg,
                color: categoryStyle.color,
                fontWeight: 'medium',
                borderRadius: 2,
                height: 20,
                fontSize: '0.625rem',
                ml: 0.5
              }}
            />
          </Box>
        )}
        
        <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
          {job.pay && (
            <Chip 
              size="small" 
              label={job.pay} 
              icon={<AttachMoney sx={{ fontSize: 14 }} />}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
          )}
          {job.shiftAndSchedule && (
            <Chip 
              size="small" 
              label={job.shiftAndSchedule} 
              icon={<Schedule sx={{ fontSize: 14 }} />}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
          )}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="caption" color="text.secondary">
              {relativeTime}
            </Typography>
          </Box>
          <KeyboardArrowRight sx={{ color: selected ? '#2DBE5F' : 'text.disabled' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

// Job Detail Card component
const JobDetailCard = ({ job, onApply, onSave }) => {
  const categoryStyle = getCategoryColor(job.category || 'Other');
  const categoryIcon = getCategoryIcon(job.category);
  const relativeTime = formatDateTime(job.postedDate);

  return (
    <Card sx={{ 
      p: 0, 
      borderRadius: 3, 
      boxShadow: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: { md: 'calc(100vh - 400px)' }
    }}>
      <Box sx={{ 
        p: 3, 
        background: 'linear-gradient(135deg, #000000 0%, #1e2b24 100%)', 
        color: 'white',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          {job.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40, 
              backgroundColor: 'white', 
              color: 'black',
              mr: 2
            }}
          >
            {job.company ? job.company.charAt(0) : "C"}
          </Avatar>
          <Box>
            <Typography variant="h6">{job.company}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2">{job.location}</Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2">
              Posted {relativeTime}
            </Typography>
          </Box>
          
          {job.category && (
            <Box sx={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>
              <Chip
                size="small"
                label={job.category}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 'medium',
                  borderRadius: 2,
                  ml: 0.5
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      
      <Box sx={{ 
        p: 3, 
        flex: '1 1 auto',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            sx={{ 
              background: 'linear-gradient(135deg, #2DBE5F, #28ab56)', 
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #28ab56, #259a4d)',
              },
              flex: 1,
              py: 1.5,
              borderRadius: 2
            }}
            onClick={() => onApply && onApply(job.id)}
          >
            Apply Now
          </Button>
          <Button
            variant="outlined"
            sx={{ 
              borderColor: '#2DBE5F', 
              color: '#2DBE5F',
              '&:hover': {
                backgroundColor: 'rgba(45, 190, 95, 0.04)',
                borderColor: '#2DBE5F',
              },
              py: 1.5,
              borderRadius: 2
            }}
            startIcon={<BookmarkBorder />}
            onClick={() => onSave && onSave(job.id)}
          >
            Save
          </Button>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Job Details</Typography>
          <Grid container spacing={2}>
            {job.pay && (
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 1, color: '#2DBE5F', fontSize: '1.2rem', fontWeight: 'bold' }}>₱</Typography>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Salary</Typography>
                    <Typography variant="body1" fontWeight={500}>{job.pay}</Typography>
                  </Box>
                </Box>
              </Grid>
            )}
            {job.jobType && (
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BusinessCenter sx={{ mr: 1, color: '#2DBE5F' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Job Type</Typography>
                    <Typography variant="body1" fontWeight={500}>{job.jobType}</Typography>
                  </Box>
                </Box>
              </Grid>
            )}
            {job.shiftAndSchedule && (
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Schedule sx={{ mr: 1, color: '#2DBE5F' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Schedule</Typography>
                    <Typography variant="body1" fontWeight={500}>{job.shiftAndSchedule}</Typography>
                  </Box>
                </Box>
              </Grid>
            )}
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CategoryIcon sx={{ mr: 1, color: '#2DBE5F' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Category</Typography>
                  <Typography variant="body1" fontWeight={500}>{job.category || "Other"}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ 
          flex: '1 1 auto',
          overflowY: 'auto',
          pb: 2
        }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Job Description</Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary', 
              whiteSpace: 'pre-line',
              lineHeight: 1.6
            }}
          >
            {job.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

function HomePage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statsAnimated, setStatsAnimated] = useState(false);

  const [filters, setFilters] = useState({
    title: '',
    location: ''
  });
  
  // Available categories
  const categories = [
    { name: "All", icon: "Apps" },
    { name: "Technology", icon: "Laptop" },
    { name: "Healthcare", icon: "Heart" },
    { name: "Finance", icon: "TrendingUp" },
    { name: "Engineering", icon: "Build" },
    { name: "Remote", icon: "Home" },
    { name: "Education", icon: "GraduationCap" },
    { name: "Other", icon: "BusinessCenter" }
  ];

  const handleApply = async (jobPostId) => {
    if (user.userType !== 'Job Seeker') {
      setSnackbarMessage("Only Job Seekers can apply for jobs.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
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

      setSnackbarMessage(result);
      setSnackbarSeverity(response.ok ? "success" : "error");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error applying for job:", error);
      setSnackbarMessage("An error occurred while applying. Please try again later.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSave = async (jobPostId) => {
    if (user.userType !== 'Job Seeker') {
      setSnackbarMessage("Only Job Seekers can save jobs.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
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

      setSnackbarMessage(result);
      setSnackbarSeverity(response.ok ? "success" : "error");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving job:", error);
      setSnackbarMessage("An error occurred while saving the job. Please try again later.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter jobs based on all criteria
  const filteredJobs = jobs
    .filter(job => job.status === "OPEN" || job.status === undefined)
    .filter(job => {
      if (categoryFilter && categoryFilter !== "all" && categoryFilter !== "All") {
        if (!job.category || job.category.toLowerCase() !== categoryFilter.toLowerCase()) {
          return false;
        }
      }
      
      const titleMatch = job.title.toLowerCase().includes(filters.title.toLowerCase());
      const companyMatch = job.company.toLowerCase().includes(filters.title.toLowerCase());
      const locationMatch = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      
      return (titleMatch || companyMatch) && locationMatch;
    });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/jobs/all");
      const data = await res.json();
      
      const jobsWithStatus = data.map(job => ({
        ...job,
        status: job.status || "OPEN",
        category: job.category || "Other"
      }));
      
      setJobs(jobsWithStatus);
      setLoading(false);
      
      if (filteredJobs.length > 0) {
        setSelectedJob(filteredJobs[0]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setSnackbarMessage("Failed to load jobs. Please try again later.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (jobs.length === 0) {
      fetchJobs();
    } else {
      if (filteredJobs.length > 0) {
        setSelectedJob(filteredJobs[0]);
      } else {
        setSelectedJob(null);
      }
    }
    setHasSearched(true);
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    handleSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    navigate('/login');
  };

  // Load jobs on component mount
  useEffect(() => {
    fetchJobs();
    setTimeout(() => setStatsAnimated(true), 1000);
  }, []);

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f7f9f7 0%, #e8f5e9 100%)',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Floating Background Shapes */}
      <FloatingShape sx={{ width: 80, height: 80, top: '10%', left: '10%', animationDelay: '0s' }} />
      <FloatingShape sx={{ width: 120, height: 120, top: '70%', right: '10%', animationDelay: '3s' }} />
      <FloatingShape sx={{ width: 60, height: 60, top: '40%', left: '80%', animationDelay: '6s' }} />

      <HomeNavbar handleLogout={handleLogout} user={user} />
      
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8, position: 'relative', zIndex: 1 }}>
        {/* Welcome Section */}
        <WelcomeSection>
          <WelcomeTitle variant="h1">
            Find Your Perfect Job
          </WelcomeTitle>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9, 
              mb: 2, 
              maxWidth: 600, 
              mx: 'auto',
              position: 'relative',
              zIndex: 2
            }}
          >
            Discover thousands of opportunities that match your skills and career goals. 
            Your dream job is just a search away.
          </Typography>
        </WelcomeSection>

        {/* Search Container */}
        <SearchContainer elevation={3}>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'center', 
            flexWrap: { xs: 'wrap', md: 'nowrap' } 
          }}>
            <TextField
              fullWidth
              placeholder="Job Title, keywords, company"
              name="title"
              value={filters.title}
              onChange={handleFilterChange}
              onKeyPress={handleKeyPress}
              variant="outlined"
              size="small"
              sx={{ 
                minWidth: { xs: '100%', md: 250 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  border: '2px solid rgba(45, 190, 95, 0.1)',
                  background: 'white',
                  fontSize: '0.75rem !important',
                  '&:hover': {
                    borderColor: 'rgba(45, 190, 95, 0.3)',
                  },
                  '&.Mui-focused': {
                    borderColor: '#2DBE5F',
                    boxShadow: '0 8px 25px rgba(45, 190, 95, 0.15)',
                  }
                },
                '& .MuiInputBase-input': {
                  fontSize: '0.75rem !important',
                  padding: '8px 12px !important',
                },
                '& input::placeholder': {
                  fontSize: '0.75rem !important',
                  opacity: 0.6,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#2DBE5F', fontSize: '0.875rem' }} />
                  </InputAdornment>
                ),
                style: { fontSize: '0.75rem' }
              }}
            />
            
            <TextField
              fullWidth
              placeholder='City, state, zip code, or "remote"'
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              onKeyPress={handleKeyPress}
              variant="outlined"
              size="small"
              sx={{ 
                minWidth: { xs: '100%', md: 250 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  border: '2px solid rgba(45, 190, 95, 0.1)',
                  background: 'white',
                  fontSize: '0.75rem !important',
                  '&:hover': {
                    borderColor: 'rgba(45, 190, 95, 0.3)',
                  },
                  '&.Mui-focused': {
                    borderColor: '#2DBE5F',
                    boxShadow: '0 8px 25px rgba(45, 190, 95, 0.15)',
                  }
                },
                '& .MuiInputBase-input': {
                  fontSize: '0.75rem !important',
                  padding: '8px 12px !important',
                },
                '& input::placeholder': {
                  fontSize: '0.75rem !important',
                  opacity: 0.6,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn sx={{ color: '#2DBE5F', fontSize: '0.875rem' }} />
                  </InputAdornment>
                ),
                style: { fontSize: '0.75rem' }
              }}
            />
            
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                background: 'linear-gradient(135deg, #2DBE5F, #28ab56)',
                color: 'white',
                borderRadius: 3,
                px: 3,
                py: 1.5,
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(45, 190, 95, 0.3)',
                whiteSpace: 'nowrap',
                '&:hover': {
                  background: 'linear-gradient(135deg, #28ab56, #259a4d)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(45, 190, 95, 0.4)',
                }
              }}
            >
              <Search sx={{ mr: 0.5, fontSize: '0.875rem' }} />
              Search Jobs
            </Button>
          </Box>
        </SearchContainer>

        {/* Categories Section */}
        {!hasSearched && (
          <Fade in={true} timeout={1000}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  textAlign: 'center', 
                  fontWeight: 700, 
                  color: '#333', 
                  mb: 1 
                }}
              >
                Browse Jobs by Category
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  textAlign: 'center', 
                  color: '#666', 
                  mb: 4,
                  fontSize: '1.1rem'
                }}
              >
                Find opportunities in your field of expertise
              </Typography>
              
              <Grid container spacing={3}>
                {/* Browse All Card */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <BrowseAllCard onClick={() => handleCategoryClick('all')}>
                    <Box sx={{ fontSize: '3rem', mb: 1 }}>🔍</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: 'white' }}>
                      Browse All Jobs
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.9)' }}>
                      Explore every opportunity
                    </Typography>
                    <CategoryButton className="category-button">
                      View All
                    </CategoryButton>
                  </BrowseAllCard>
                </Grid>

                {/* Category Cards */}
                {categories.slice(1).map((category) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={category.name}>
                    <CategoryCard onClick={() => handleCategoryClick(category.name)}>
                      {getCategoryIcon(category.name.toLowerCase())}
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', mb: 0.5 }}>
                        {category.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                        {category.name === 'Technology' && 'Software, AI, Data & More'}
                        {category.name === 'Healthcare' && 'Medical & Wellness Careers'}
                        {category.name === 'Finance' && 'Banking, Investment & Analysis'}
                        {category.name === 'Engineering' && 'Build the Future'}
                        {category.name === 'Remote' && 'Work From Anywhere'}
                        {category.name === 'Education' && 'Teaching & Learning'}
                        {category.name === 'Other' && 'Explore More Categories'}
                      </Typography>
                      <CategoryButton className="category-button">
                        Explore {category.name}
                      </CategoryButton>
                    </CategoryCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Stats Bar */}
        {!hasSearched && (
          <Fade in={statsAnimated} timeout={1000}>
            <StatsBar>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#2DBE5F', 
                    mb: 0.5 
                  }}
                >
                  50K+
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  Active Jobs
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#2DBE5F', 
                    mb: 0.5 
                  }}
                >
                  15K+
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  Companies
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#2DBE5F', 
                    mb: 0.5 
                  }}
                >
                  100K+
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  Success Stories
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#2DBE5F', 
                    mb: 0.5 
                  }}
                >
                  5K+
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  New Jobs Weekly
                </Typography>
              </Box>
            </StatsBar>
          </Fade>
        )}

        {/* Search Results Section */}
        {hasSearched && (
          <Container maxWidth="xl" sx={{ pb: 4 }}>
            {loading ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  {[1, 2, 3].map((i) => (
                    <Card key={i} sx={{ mb: 2, p: 2, borderRadius: 3 }}>
                      <Skeleton variant="text" width="70%" height={32} />
                      <Skeleton variant="text" width="50%" height={24} />
                      <Skeleton variant="text" width="40%" height={24} />
                    </Card>
                  ))}
                </Grid>
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="40%" height={32} />
                    <Skeleton variant="rectangular" height={60} sx={{ my: 2 }} />
                    <Skeleton variant="rectangular" height={200} />
                  </Card>
                </Grid>
              </Grid>
            ) : filteredJobs.length > 0 ? (
              <Grid container spacing={3}>
                {/* Left Column: Job List */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    mb: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {filteredJobs.length} Open {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                      {categoryFilter !== 'all' && categoryFilter !== 'All' ? ` in ${categoryFilter}` : ''}
                    </Typography>
                    
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => {
                        setFilters({ title: '', location: '' });
                        setCategoryFilter('all');
                        setHasSearched(false);
                      }}
                      sx={{ 
                        textTransform: 'none',
                        borderRadius: 2,
                        borderColor: '#2DBE5F',
                        color: '#2DBE5F',
                        fontSize: '0.75rem',
                        p: '4px 8px',
                        '&:hover': {
                          borderColor: '#28ab56',
                          backgroundColor: 'rgba(45, 190, 95, 0.04)'
                        }
                      }}
                    >
                      Clear
                    </Button>
                  </Box>
                  
                  <Box sx={{ 
                    maxHeight: { md: 'calc(100vh - 300px)' }, 
                    overflowY: 'auto',
                    pr: { md: 2 }
                  }}>
                    {filteredJobs.map((job) => (
                      <JobCard 
                        key={job.id} 
                        job={job} 
                        selected={selectedJob && selectedJob.id === job.id}
                        onClick={() => setSelectedJob(job)} 
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Right Column: Job Details */}
                <Grid item xs={12} md={8}>
                  {selectedJob ? (
                    <JobDetailCard 
                      job={selectedJob} 
                      onApply={handleApply} 
                      onSave={handleSave} 
                    />
                  ) : (
                    <Card sx={{ 
                      p: 4, 
                      borderRadius: 3, 
                      textAlign: 'center', 
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minHeight: { md: 'calc(100vh - 400px)' }
                    }}>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Select a job to view details
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Browse the job listings on the left to see detailed information.
                      </Typography>
                    </Card>
                  )}
                </Grid>
              </Grid>
            ) : (
              // No results found
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center',
                py: 8
              }}>
                <Work sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                  No open jobs match your search
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mb: 3 }}>
                  {categoryFilter !== 'all' && categoryFilter !== 'All' 
                    ? `No jobs found in the ${categoryFilter} category matching your criteria.` 
                    : "Try adjusting your search criteria or using more general keywords to find more opportunities."}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => {
                    setFilters({ title: '', location: '' });
                    setCategoryFilter('all');
                    setHasSearched(false);
                  }}
                  sx={{ 
                    background: 'linear-gradient(135deg, #2DBE5F, #28ab56)',
                    color: 'white',
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #28ab56, #259a4d)',
                    }
                  }}
                >
                  Reset Search
                </Button>
              </Box>
            )}
          </Container>
        )}

        {/* Job Search Tips Section */}
        {!hasSearched && (
          <Fade in={true} timeout={1500}>
            <Paper 
              elevation={2}
              sx={{ 
                background: 'linear-gradient(135deg, rgba(45,190,95,0.05), rgba(45,190,95,0.1))',
                borderRadius: 4,
                p: 4,
                border: '1px solid rgba(45, 190, 95, 0.2)',
                mt: 4
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#333', 
                  mb: 3,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Star sx={{ color: '#2DBE5F', mr: 1 }} />
                Job Search Tips for Success
              </Typography>
              
              <Grid container spacing={2}>
                {[
                  { icon: '📄', text: 'Keep your resume updated and tailored to each application' },
                  { icon: '🤝', text: 'Network actively and maintain professional connections' },
                  { icon: '🔍', text: 'Use specific keywords related to your desired position' },
                  { icon: '⏰', text: 'Apply promptly to new job postings for better visibility' },
                  { icon: '🏢', text: 'Research companies thoroughly before applying' },
                  { icon: '✉️', text: 'Write personalized cover letters for each application' }
                ].map((tip, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper 
                      elevation={1}
                      sx={{ 
                        p: 2, 
                        borderRadius: 2,
                        background: 'white',
                        border: '1px solid rgba(45, 190, 95, 0.1)',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Box sx={{ fontSize: '1.5rem', mr: 2 }}>{tip.icon}</Box>
                      <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.5 }}>
                        {tip.text}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Fade>
        )}
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%',
            borderRadius: 2
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default HomePage;