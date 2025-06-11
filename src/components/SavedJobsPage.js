import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';

function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});

  // Fetch saved jobs from backend
  const fetchSavedJobs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/savedJobs/${user.userId}`);
      const data = await response.json();
      setSavedJobs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setLoading(false);
    }
  };

  // Handle Apply button click
  const handleApply = async (jobPostId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/apply?userId=${user.userId}&jobPostId=${jobPostId}`, {
        method: 'POST',
      });

      const result = await response.text();
      
      setMessage(result);  // Set the response message
      setOpenSnackbar(true); // Open Snackbar to show result message
    } catch (error) {
      console.error('Error applying for job:', error);
      setMessage('An error occurred while applying.');
      setOpenSnackbar(true);
    }
  };

  // Navigate back to the previous page
  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (user.userId) {
      fetchSavedJobs();
    }
  }, [user.userId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    navigate('/login');
  };

  return (
    <>
      <HomeNavbar handleLogout={handleLogout} />
      <div className="saved-jobs-page" style={{ padding: '20px' }}>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleBackClick}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <h2>Your Saved Jobs</h2>

        {savedJobs.length === 0 ? (
          <Typography variant="h6">You don't have any saved jobs yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {savedJobs.map((savedJob) => (
              <Grid item xs={12} sm={6} md={4} key={savedJob.id}>
                <Card variant="outlined" sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {savedJob.jobPost.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ marginBottom: 1 }}>
                      {savedJob.jobPost.company} • {savedJob.jobPost.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                      {savedJob.jobPost.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                      💰 {savedJob.jobPost.pay} | 🕒 {savedJob.jobPost.shiftAndSchedule}
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'darkgray',
                        },
                      }}
                      onClick={() => handleApply(savedJob.jobPost.id)}
                      fullWidth
                    >
                      Apply
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={message}
        />
      </div>
    </>
  );
}

export default SavedJobsPage;
