import postjob from "../assets/postjob.jpg"; // Using this image properly now
import { useNavigate } from "react-router-dom"; // Import this
import Navbar from './EmployerNavbar';
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Typography,
  } from "@mui/material";
  
  const EmployerLanding= () => {
    const navigate = useNavigate();
  
    const handlePostJobClick = () => {
      navigate("/register");
    };
  
    const processCards = [
      {
        number: "1",
        title: "Create your free account",
        description: "Sign up in seconds and access powerful hiring tools.",
      },
      {
        number: "2",
        title: "Build your job post",
        description: "Customize your job listing to attract the right candidates.",
      },
      {
        number: "3",
        title: "Post your job",
        description: "Reach thousands of job seekers instantly.",
      },
    ];
  
    return (
      <Box sx={{ bgcolor: "white" }}>
        <Navbar />
  
        <Container maxWidth="lg" sx={{ position: "relative", minHeight: "100vh" }}>
          <Box sx={{ mt: 12, position: "relative" }}>
            <Typography
              variant="h2"
              fontFamily="'Poppins-SemiBold', Helvetica"
              fontWeight="600"
              fontSize="40px"
              maxWidth={531}
            >
              <Box component="span" color="black">
                Find the Best Talent,{" "}
              </Box>
              <Box component="span" color="#2dbe5f">
                Fast & Easy
              </Box>
            </Typography>
  
            <Button
              variant="contained"
              onClick={handlePostJobClick}
              sx={{
                bgcolor: "black",
                borderRadius: "15px",
                width: 200,
                height: 50,
                mt: 5,
                textTransform: "none",
                fontFamily: "'Poppins-SemiBold', Helvetica",
                fontWeight: 550,
                fontSize: "1.1rem",
              }}
            >
              Post a job
            </Button>
  
            <Box
              component="img"
              src={postjob}
              alt="Job search illustration"
              sx={{
                position: "absolute",
                width: 397,
                height: 417,
                top: 0,
                right: 0,
              }}
            />
          </Box>
  
          {/* Process Cards Section */}
          <Grid container spacing={12} sx={{ mt: 20 }}>
            {processCards.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    p: 4,
                    height: 280,
                    borderRadius: "10px",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    color="#2dbe5f"
                    fontFamily="'Inter-Bold', Helvetica"
                    fontWeight="bold"
                    fontSize="1.25rem"
                  >
                    {card.number}
                  </Typography>
  
                  <Typography
                    variant="h4"
                    fontFamily="'Poppins-SemiBold', Helvetica"
                    fontWeight="600"
                    fontSize="32px"
                    sx={{ mt: 6, maxWidth: 249 }}
                  >
                    {card.title}
                  </Typography>
  
                  <Typography
                    variant="body1"
                    fontFamily="'Inter-Regular', Helvetica"
                    sx={{ mt: 4, maxWidth: 258 }}
                  >
                    {card.description}
                  </Typography>
                </Card>
  
                {index < processCards.length - 1 && (
                  <Divider sx={{ my: 4 }} />
                )}
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default EmployerLanding;
  