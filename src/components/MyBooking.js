import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import './MyBooking.css';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const result = await axios.get("http://localhost:8080/booking/get", {
        validateStatus: (status) => status >= 200 && status < 300,
      });

      if (result.status === 200) {
        setBookings(result.data); // Save the data from the backend, including serviceEntity
      } else {
        console.error("Failed to load bookings:", result.status, result.statusText);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const handleDelete = async (bookingID) => {
    try {
      await axios.delete(`http://localhost:8080/booking/delete/${bookingID}`);
      loadBooking(); // Reload bookings after deletion
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div>
      <HomeNavbar />

      <div>
        <h2 className="mybooking-header">My Bookings</h2>
      </div>
      <div className="booking-container">
        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Booking Date</th>
                <th>Booking Time</th>
                <th>Booking Status</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="5">You don't have any bookings available at the moment.</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.bookingID}>
                    {/* Accessing the service title from the serviceEntity object */}
                    <td>{booking.serviceEntity?.title || "Service Title Not Available"}</td> 
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        className="cancel-button"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this booking?")) {
                            handleDelete(booking.bookingID);
                          }
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <button className="add-booking">
          <Link to="/homepage">Add new Booking</Link>
        </button>
      </div>
    </div>
  );
};

export default MyBooking;
