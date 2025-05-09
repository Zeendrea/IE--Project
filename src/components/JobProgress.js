import React, { useState } from "react";
import axios from "axios";
import "./JobProgresStyles.css";

const JobProgress = () => {
  // State variables to store form data
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [updateTime, setUpdateTime] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const jobProgress = { status, comment, updateTime };
      // Make an axios POST request to save the data
      const response = await axios.post("http://localhost:8080/jobprogress/register", jobProgress);
      if (response.status === 200) {
        alert("Job progress saved successfully!");
      } else {
        alert("Failed to save job progress.");
      }
    } catch (error) {
      console.error("Error saving job progress:", error);
      alert("Error saving job progress.");
    }
  };

  return (
    <div className="job-progress-container">
      <header className="job-progress-header">
        <h1>Job Progress Tracker</h1>
      </header>

      <form className="job-progress-form" onSubmit={handleSubmit}>
        <label htmlFor="status">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <label htmlFor="updateTime">Time</label>
        <input
          type="text"
          id="updateTime"
          name="updateTime"
          value={updateTime}
          onChange={(e) => setUpdateTime(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default JobProgress;
