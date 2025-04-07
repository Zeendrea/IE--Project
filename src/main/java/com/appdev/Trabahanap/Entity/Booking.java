package com.appdev.Trabahanap.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingID;

    private String date;
    private String time;
    private String status;

    // Mapping to ServiceEntity (Many-to-One relationship)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "service_id", referencedColumnName = "serviceID")
    private ServiceEntity serviceEntity;

    // Mapping to UserEntity (Many-to-One relationship)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserEntity userEntity;

    // Constructors
    public Booking() {
    }

    public Booking(int bookingID, String date, String time, String status, ServiceEntity serviceEntity, UserEntity userEntity) {
        this.bookingID = bookingID;
        this.date = date;
        this.time = time;
        this.status = status;
        this.serviceEntity = serviceEntity;
        this.userEntity = userEntity;
    }

    // Getters and Setters
    public int getBookingID() {
        return bookingID;
    }

    public void setBookingID(int bookingID) {
        this.bookingID = bookingID;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ServiceEntity getServiceEntity() {
        return serviceEntity;
    }

    public void setServiceEntity(ServiceEntity serviceEntity) {
        this.serviceEntity = serviceEntity;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }
}
