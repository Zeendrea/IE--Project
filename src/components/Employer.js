import React from "react";
import {Box} from "@mui/material"
import EmployerNav from "./EmployerNav";
import { useNavigate } from "react-router-dom";

const Employer = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/jobpost");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <EmployerNav />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition"
      >
        Go to Job Post
      </button>
    </div>
    </Box>
  );
};

export default Employer;
