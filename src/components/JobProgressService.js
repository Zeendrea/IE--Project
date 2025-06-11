import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/jobprogress";

export const getAllJobProgresses = () => {
    return axios.get(`${API_BASE_URL}/all`);
};

export const registerJobProgress = (jobProgress) => {
    return axios.post(`${API_BASE_URL}/register`, jobProgress);
};

export const updateJobProgress = (id, jobProgress) => {
    return axios.put(`${API_BASE_URL}/update/${id}`, jobProgress);
};

export const deleteJobProgress = (id) => {
    return axios.delete(`${API_BASE_URL}/delete/${id}`);
};
