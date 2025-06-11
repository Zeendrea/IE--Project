import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddBooking = () => {
    const navigate = useNavigate(); // Correct usage of useNavigate hook

    const [booking, setBooking] = useState({
        date: '',
        time: '',
        status: 'Pending',
        serviceID: '',
        title:'',
    });

    const { date, time, status } = booking;

    const handleInputChange = (e) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.post('http://localhost:8080/booking/add', booking);
            console.log('Booking added:', response.data);

            alert("Booking added successfully");
            navigate('/mybooking');
            // Optionally, you can reset the form fields
            setBooking({ date: '', time: '', status: '' });
        } catch (error) {
            console.error('Error adding booking:', error);
        }
    };

    return (
        <div className='container my-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <form onSubmit={handleSubmit} className='border p-4 rounded shadow'>
                        {/* <h2 className='mb-4 text-center'>Add Booking</h2> */}
                        
                        <div className='input-group mb-4'>
                            <label className='input-group-text' htmlFor='date'>
                                What date do you want to start the service?
                            </label>
                            <input
                                className='form-control'
                                type='date'
                                name='date'
                                id='date'
                                required
                                value={date}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='input-group mb-4'>
                            <label className='input-group-text' htmlFor='time'>
                                Specific Time
                            </label>
                            <input
                                className='form-control'
                                type='time'
                                name='time'
                                id='time'
                                required
                                value={time}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* <div className='input-group mb-4'>
                            <label className='input-group-text' htmlFor='status'>
                                Booking Status
                            </label>
                            <input
                                className='form-control'
                                type='text'
                                name='status'
                                id='status'
                                required
                                value={status}
                                onChange={handleInputChange}
                            />
                        </div> */}
                        <Link to='/mybooking' className='btn btn-warning btn-block mt-3'>
                        <button type='submit' className='btn btn-primary btn-block'>
                            Add Booking
                        </button>
                        </Link>
                        {/* Link to view bookings page */}
                        <Link to='/mybooking' className='btn btn-warning btn-block mt-3'>
                            View Bookings
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBooking;
