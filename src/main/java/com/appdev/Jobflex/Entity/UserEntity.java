package com.appdev. Jobflex.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class UserEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private int userId;
	private String name;
	
	@Column(unique = true)
	private String email;
	
	private String phone;
	private String address;
	private String password;
	private String userType;
	
	private String profileImage;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id")
    @JsonBackReference

	private ServiceProviderEntity serviceProvider;
	
	
	public UserEntity(String name, String email, String phone, String address, String password, String userType, ServiceProviderEntity serviceProvider) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.password = password;
		this.userType = userType;
		this.serviceProvider = serviceProvider;
	}
	
	public UserEntity() {
		// TODO Auto-generated constructor stub
	}

	public int getUserId() {
		return userId;
	}
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public String getPhone() {
		return phone;
	}
	public String getAddress() {
		return address;
	}
	public String getPassword() {
		return password;
	}
	public String getUserType() {
		return userType;
	}
	public String getProfileImage() {
		return profileImage;
	}
	
	public ServiceProviderEntity getServiceProvider() {
		return serviceProvider;
	}
	
	public void setUserID(int userId) {
		this.userId = userId;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}
	
	public void setServiceProvider(ServiceProviderEntity serviceProvider) {
		this.serviceProvider = serviceProvider;
	}
	

}

















