import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
const ServiceForm = () => {
  const navigate = useNavigate(); 
  const [service, setService] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    availability: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/services/create", service);
      alert("Service added successfully!");
      setService({
        title: "",
        type: "",
        description: "",
        price: "",
        availability: "",
      }); // Reset form
    } catch (error) {
      console.error("Error adding service:", error);
      alert("An error occurred while adding the service.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "2rem" }}>
        Add a Service
      </h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "grid", gap: "1rem" }}>
          <div>
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem", display: "block" }}>
              Service Name
            </label>
            <input
              type="text"
              name="title"
              placeholder="Service Name"
              value={service.title}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem", display: "block" }}>
              Service Type
            </label>
            <input
              type="text"
              name="type"
              placeholder="Service Type"
              value={service.type}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem", display: "block" }}>
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={service.description}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1rem",
                resize: "none",
              }}
            ></textarea>
          </div>

          <div>
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem", display: "block" }}>
              Pricing
            </label>
            <input
              type="number"
              name="price"
              placeholder="Pricing"
              value={service.price}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem", display: "block" }}>
              Availability
            </label>
            <input
              type="text"
              name="availability"
              placeholder="Availability"
              value={service.availability}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <button
            type="button"
            onClick={() => navigate('/providerhome')}  // Navigate to homepage when Cancel is clicked
            style={{
              background: "#ccc",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              background: "#007bff",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
