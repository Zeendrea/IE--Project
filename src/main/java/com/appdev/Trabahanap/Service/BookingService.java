package com.appdev.Trabahanap.Service;

import com.appdev.Trabahanap.Entity.Booking;
import com.appdev.Trabahanap.Entity.ServiceEntity;
import com.appdev.Trabahanap.Entity.UserEntity;
import com.appdev.Trabahanap.Repository.BookingRepository;
import com.appdev.Trabahanap.Repository.ServiceRepository;
import com.appdev.Trabahanap.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private static final Logger logger = LoggerFactory.getLogger(BookingService.class);

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private UserRepository userRepository;
    
    public Booking getBookingById(int bookingID) {
    	return bookingRepository.findById(bookingID).orElse(null);
    }

    public Booking postBookingRecord(Booking booking) {
        try {
            logger.info("Attempting to save booking: {}", booking);

            // Log user ID for debugging
            logger.info("User ID received: {}", booking.getUserEntity().getUserId());

            // Validate the user ID
            if (booking.getUserEntity().getUserId() <= 0) {
                throw new RuntimeException("Invalid User ID: " + booking.getUserEntity().getUserId());
            }

            // Fetch the ServiceEntity from the database using its ID
            ServiceEntity serviceEntity = serviceRepository.findById(booking.getServiceEntity().getServiceID())
                    .orElseThrow(() -> new RuntimeException("Service not found with ID: " + booking.getServiceEntity().getServiceID()));

            // Fetch the UserEntity from the database using its ID
            UserEntity userEntity = userRepository.findById(booking.getUserEntity().getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + booking.getUserEntity().getUserId()));

            // Set the fetched entities to the Booking object
            booking.setServiceEntity(serviceEntity);
            booking.setUserEntity(userEntity);

            // Save the Booking object
            Booking savedBooking = bookingRepository.save(booking);
            logger.info("Booking saved successfully: {}", savedBooking);
            return savedBooking;
        } catch (Exception e) {
            // Log the error
            logger.error("Error saving booking", e);
            throw e; // Re-throw to be caught by the controller
        }
    }

    // Get all bookings
    public List<Booking> getAllBooking() {
        return bookingRepository.findAll();
    }

    // Update booking details
    public Booking putBookingDetails(int bookingID, Booking newBookingDetails) {
        Booking booking = bookingRepository.findById(bookingID)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingID));

        // Ensure non-null newBookingDetails before setting fields
        if (newBookingDetails != null) {
            booking.setDate(newBookingDetails.getDate());
            booking.setTime(newBookingDetails.getTime());
            booking.setStatus(newBookingDetails.getStatus());
        } else {
            throw new RuntimeException("New booking details cannot be null");
        }

        return bookingRepository.save(booking);
    }

    // Delete booking by ID
    public String deleteBooking(int bookingID) {
        // Check if the booking exists before attempting to delete
        if (bookingRepository.findById(bookingID).isPresent()) {
            bookingRepository.deleteById(bookingID);
            return "Booking record successfully deleted!";
        } else {
            return "Booking " + bookingID + " Not Found";
        }
    }
}
