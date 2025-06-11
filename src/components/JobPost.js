import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField, Box } from "@mui/material";

const API_URL = "http://localhost:8080/api/jobs";

export default function JobPost() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    pay: "",
    jobType: "",
    shiftAndSchedule: "",
    description: "",
    employerId: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      // Still using storedUser.userId because that's what the DB/API expects
      setFormData((prev) => ({ ...prev, employerId: storedUser.userId }));
    }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch(`${API_URL}/all`);
    const data = await res.json();
    setJobs(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employerId, ...jobDetails } = formData;

    const res = await fetch(`${API_URL}/post?userId=${employerId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobDetails)
    });

    alert(await res.text());
    fetchJobs();
    setFormData((prev) => ({
      title: "",
      company: "",
      location: "",
      pay: "",
      jobType: "",
      shiftAndSchedule: "",
      description: "",
      employerId: prev.employerId // preserve the logged-in user's ID
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/providerhome")}
        sx={{ mb: 2 }}
      >
        ← Back to My Jobs
      </Button>

      <Typography variant="h5" gutterBottom>
        📝 Post a New Job
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

        {/* Hidden input for employerId */}
        <input type="hidden" name="employerId" value={formData.employerId} />

        <Button type="submit" variant="contained">
          Post Job
        </Button>
      </Box>
    </Box>
  );
}
