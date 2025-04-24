package com.appdev. Jobflex.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;

	private String googleId;

	private String name;

	@Column(unique = true)
	private String email;

	private String phone;
	private String address;
	private String password;
	private String userType;
	private String profileImage;

	private Integer employerId; // New field

	public UserEntity(String name, String email, String phone, String address, String password, String userType) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.password = password;
		this.userType = userType;

		if ("employer".equalsIgnoreCase(userType)) {
			// You can generate or assign employerId here as needed
			this.employerId = generateEmployerId(); // or any logic
		}
	}

	public UserEntity() {}

	// Getters and Setters

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

	public Integer getEmployerId() {
		return employerId;
	}
	public String getGoogleId() {
		return googleId;
	}

	public void setUserID(int userId) {
		this.userId = userId;
	}

	public void setGoogleId(String googleId) {
		this.googleId = googleId;
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

		if ("employer".equalsIgnoreCase(userType)) {
			this.employerId = generateEmployerId(); // Conditional assignment
		} else {
			this.employerId = null;
		}
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	public void setEmployerId(Integer employerId) {
		this.employerId = employerId;
	}

	private int generateEmployerId() {
		// You can customize this logic
		return (int) (Math.random() * 10000); // Example random ID
	}
}















