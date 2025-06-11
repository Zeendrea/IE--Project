import React, { useEffect, useState } from 'react';
import './ProviderHomepage.css';
import { useNavigate } from 'react-router-dom';
import EmployerNav from './EmployerNav';
import beagleImage from '../assets/beagle.png';
import { Card, CardContent, Typography, Button, TextField, Grid, Box } from "@mui/material";

const API_URL = "http://localhost:8080/api/jobs";

function ProviderHomePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        company: "",
        location: "",
        pay: "",
        jobType: "",
        shiftAndSchedule: "",
        description: "",
        userId: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setFormData(prev => ({ ...prev, userId: storedUser.userId }));
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch(`${API_URL}/all`);
            const data = await res.json();
            setJobs(data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
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
        const { id, userId, ...jobDetails } = formData;

        const url = `${API_URL}/update/${id}?userId=${userId}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jobDetails)
        });

        alert(await res.text());
        fetchJobs();
        resetForm();
    };

    const deleteJob = async (id, userId) => {
        if (window.confirm("Delete this job?")) {
            const res = await fetch(`${API_URL}/delete/${id}?userId=${userId}`, {
                method: "DELETE"
            });
            alert(await res.text());
            fetchJobs();
        }
    };

    const editJob = (job) => {
        setFormData({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            pay: job.pay,
            jobType: job.jobType,
            shiftAndSchedule: job.shiftAndSchedule,
            description: job.description,
            userId: user.userId
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
            userId: user.userId || ""
        });
        setIsEditing(false);
    };

    return (
        <div className="homepage">
            <EmployerNav handleLogout={handleLogout} />
            <main className="content">
                <div className="info-display-container">
                    <div className="greeting">Welcome, {user.name || "User"}!</div>
                </div>

                {isEditing && (
                    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            📝 Edit Job
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
                            {[
                                "title",
                                "company",
                                "location",
                                "pay",
                                "jobType",
                                "shiftAndSchedule",
                                "description"
                            ].map((field) => (
                                <TextField
                                    key={field}
                                    name={field}
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required={field !== "shiftAndSchedule"}
                                    fullWidth
                                />
                            ))}
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button type="submit" variant="contained">
                                    Update Job
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={resetForm}>
                                    Cancel Edit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                )}

<Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
            📋 My Job Listings
        </Typography>
        <Button variant="contained" onClick={() => navigate("/jobpost")}>
            Post Job
        </Button>
    </Box>

                    <Grid container spacing={2} mb={4}>
                        {jobs
                            .filter((job) => job.employer?.userId === user.userId)
                            .map((job) => (
                                <Grid item xs={12} key={job.id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6">{job.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {job.company} | {job.location} | {job.jobType}
                                            </Typography>
                                            <Typography sx={{ mt: 1 }}>{job.description}</Typography>
                                            <Typography variant="body2">
                                                Pay: {job.pay} | Schedule: {job.shiftAndSchedule}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => editJob(job)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => deleteJob(job.id, user.userId)}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            </main>
        </div>
    );
}

export default ProviderHomePage;
