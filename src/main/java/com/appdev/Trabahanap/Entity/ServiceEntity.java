package com.appdev.Trabahanap.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "service")
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceID; // Primary Key

    @Column(nullable = false)
    private String title; // Title of the service

    @Column(length = 500)
    private String description; // Description of the service

    @Column(nullable = false)
    private Double price; // Price of the service

    @Column(nullable = false)
    private Boolean availability; // Availability status (true/false)

    // Default constructor
    public ServiceEntity() {
    }

    // Constructor with parameters
    public ServiceEntity(String title, String description, Double price, Boolean availability) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.availability = availability;
    }

    // Getters and Setters
    public Long getServiceID() {
        return serviceID;
    }

    public void setServiceID(Long serviceID) {
        this.serviceID = serviceID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }
}
