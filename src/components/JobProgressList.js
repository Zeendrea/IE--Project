import React, { useEffect, useState } from 'react';
import { getAllJobProgresses, deleteJobProgress, updateJobProgress } from './JobProgressService';
import './JobProgressListStyles.css';

const JobProgressList = () => {
    const [progressList, setProgressList] = useState([]);
    const [editingProgress, setEditingProgress] = useState(null);
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');
    const [updateTime, setUpdateTime] = useState('');

    useEffect(() => {
        loadProgressList();
    }, []);

    const loadProgressList = async () => {
        const response = await getAllJobProgresses();
        setProgressList(response.data);
    };

    const handleDelete = async (id) => {
        await deleteJobProgress(id);
        loadProgressList();
    };

    const handleEdit = (progress) => {
        setEditingProgress(progress);
        setStatus(progress.status);
        setComment(progress.comment);
        setUpdateTime(progress.updateTime);
    };

    const handleUpdate = async () => {
        const updatedProgress = { status, comment, updateTime };
        try {
            await updateJobProgress(editingProgress.progressId, updatedProgress);
            setEditingProgress(null);
            loadProgressList();
        } catch (error) {
            console.error("Error updating job progress:", error);
            alert("Failed to update job progress. Please try again.");
        }
    };

    return (
        <div>
            <h2>All Job Progresses</h2>
            <ul>
                {progressList.map(progress => (
                    <li key={progress.progressId}>
                        {progress.status} - {progress.comment} (Updated: {progress.updateTime})
                        <button onClick={() => handleDelete(progress.progressId)}>Delete</button>
                        <button onClick={() => handleEdit(progress)}>Edit</button>
                    </li>
                ))}
            </ul>

            {editingProgress && (
                <div>
                    <h3>Edit Job Progress</h3>
                    <input 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        placeholder="Status" 
                    />
                    <input 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Comment" 
                    />
                    <input 
                        value={updateTime} 
                        onChange={(e) => setUpdateTime(e.target.value)} 
                        placeholder="Update Time" 
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setEditingProgress(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default JobProgressList;
