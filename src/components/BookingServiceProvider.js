import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeNavbar from './HomeNavbar';
import './MyBooking.css';

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBooking();
  }, []);

  // Load bookings from backend
  const loadBooking = async () => {
    try {
      const result = await axios.get("http://localhost:8080/booking/get");
      if (result.status === 200) {
        setBookings(result.data);
      } else {
        console.error("Failed to load bookings:", result.status, result.statusText);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  // Handle booking acceptance
  const handleAcceptBooking = async (bookingID) => {
    try {
      const updatedBooking = await axios.put(`http://localhost:8080/booking/update/${bookingID}`, {
        status: 'Accepted',
      });
      if (updatedBooking.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.bookingID === bookingID
              ? { ...booking, status: 'Accepted' }
              : booking
          )
        );
      }
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  // Handle booking decline
  const handleDeclineBooking = async (bookingID) => {
    try {
      const updatedBooking = await axios.put(`http://localhost:8080/booking/update/${bookingID}`, {
        status: 'Declined',
      });
      if (updatedBooking.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.bookingID === bookingID
              ? { ...booking, status: 'Declined' }
              : booking
          )
        );
      }
    } catch (error) {
      console.error("Error declining booking:", error);
    }
  };

  return (
    <div>
      <HomeNavbar />
      <div>
        <h2 className="mybooking-header">Your Bookings</h2>
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
                <th colSpan="2">Actions</th>
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
                    <td>{booking.serviceEntity?.title || "Service Title Not Available"}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td
                      className={
                        booking.status === 'Declined' ? 'status-declined' : ''
                      }
                    >
                      {booking.status}
                    </td>
                    <td>
                      {booking.status === 'Pending' && (
                        <button
                          className="accept-button"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to accept this booking?")) {
                              handleAcceptBooking(booking.bookingID);
                            }
                          }}
                        >
                          Accept
                        </button>
                      )}
                    </td>
                    <td>
                      {booking.status === 'Pending' && (
                        <button
                          className="decline-button"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to decline this booking?")) {
                              handleDeclineBooking(booking.bookingID);
                            }
                          }}
                        >
                          Decline
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Booking;
