package com.appdev. Jobflex.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name="service_provider")
public class ServiceProviderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int providerId;
    
    private String serviceType;
    private String rating;
    private String verifiedStatus;

    @OneToMany(fetch = FetchType.LAZY, mappedBy="serviceProvider", cascade = CascadeType.ALL)
    @JsonManagedReference  // Avoids circular reference
    private List<UserEntity> users;


    public ServiceProviderEntity(String serviceType, String rating, String verifiedStatus) {
        this.serviceType = serviceType;
        this.rating = rating;
        this.verifiedStatus = verifiedStatus;
    }

    public ServiceProviderEntity() {
        //
    }

    public int getProviderId() {
        return providerId;
    }

    public String getServiceType() {
        return serviceType;
    }

    public String getRating() {
        return rating;
    }

    public String getVerifiedStatus() {
        return verifiedStatus;
    }

    public List<UserEntity> getUsers() {
        return users;
    }

    public void setProviderId(int providerId) {
        this.providerId = providerId;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public void setVerifiedStatus(String verifiedStatus) {
        this.verifiedStatus = verifiedStatus;
    }

    public void setUsers(List<UserEntity> users) {
        this.users = users;
    }
}
