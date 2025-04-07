package com.appdev.Trabahanap.Controller;

import com.appdev.Trabahanap.Entity.Booking;
import com.appdev.Trabahanap.Entity.ServiceEntity;
import com.appdev.Trabahanap.Entity.UserEntity;
import com.appdev.Trabahanap.Repository.BookingRepository;
import com.appdev.Trabahanap.Repository.UserRepository;
import com.appdev.Trabahanap.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5174","http://localhost:3000"})
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;


    @PostMapping("/add")
    public Booking postBookingRecord(@RequestBody Booking booking) {
        return bookingService.postBookingRecord(booking);
    }


    @GetMapping("/get")
    public List<Booking> getAllBooking(){
        return bookingService.getAllBooking();
    }

//    @CrossOrigin(origins = "http://localhost:5173")
//    @GetMapping("/get/{bookingID}")
//    public List<Booking> getAllBooking() {
//        List<Booking> bookings = bookingService.getAllBooking();
//
//        // Access service title and ID from each booking
//        for (Booking booking : bookings) {
//            if (booking.getServiceEntity() != null) {
//                // Optionally log or print service details
//                System.out.println("Service ID: " + booking.getServiceEntity().getServiceID());
//                System.out.println("Service Title: " + booking.getServiceEntity().getTitle());
//            }
//        }
//
//        return bookings; // Returning the bookings with service details included
//    }


    @PutMapping("/update/{bookingID}")
    public Booking putBookingDetails(@PathVariable int bookingID, @RequestBody Booking newBookingDetails) {
        return bookingService.putBookingDetails(bookingID, newBookingDetails);
    }


    @DeleteMapping("/delete/{bookingID}")
    public String deleteBooking(@PathVariable int bookingID) {
        return bookingService.deleteBooking(bookingID);
    }
    
    
    @GetMapping("/customer/{bookingID}")
    public ResponseEntity<Map<String, String>> getCustomerDetails(@PathVariable int bookingID) {
        Booking booking = bookingService.getBookingById(bookingID);
        
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }

        UserEntity customer = booking.getUserEntity();
        if (customer == null || !customer.getUserType().equalsIgnoreCase("customer")) {
            return ResponseEntity.notFound().build();
        }

        // Extract only the required details
        Map<String, String> customerDetails = new HashMap<>();
        customerDetails.put("name", customer.getName());
        customerDetails.put("email", customer.getEmail());
        customerDetails.put("phone", customer.getPhone());
        customerDetails.put("address", customer.getAddress());

        return ResponseEntity.ok(customerDetails);
    }

}
