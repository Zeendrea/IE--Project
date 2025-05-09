import React, { useState } from 'react';
import { registerJobProgress } from './JobProgressService';
import "./AddJobProgressStyles.css";



const AddJobProgress = () => {
    const [jobProgress, setJobProgress] = useState({
        status: '',
        comment: '',
        updateTime: ''
    });

    const handleChange = (e) => {
        setJobProgress({ ...jobProgress, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerJobProgress(jobProgress);
        alert('Job Progress Registered');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Job Progress</h2>
            <input type="text" name="status" placeholder="Status" onChange={handleChange} />
            <input type="text" name="comment" placeholder="Comment" onChange={handleChange} />
            <input type="text" name="updateTime" placeholder="Update Time" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddJobProgress;
