package com.appdev. Jobflex.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Setter;
import lombok.Getter;

@Entity
@Setter
@Getter
@Table(name="users")
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;

	@Setter
    private String googleId;

    private String name;

	@Setter
    @Column(unique = true)
	private String email;

	@Setter
    private String phone;
	@Setter
    private String address;
	@Setter
    private String password;
	private String userType;
	@Setter
    private String profileImage;

	@Setter
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

    public void setUserType(String userType) {
		this.userType = userType;

		if ("employer".equalsIgnoreCase(userType)) {
			this.employerId = generateEmployerId(); // Conditional assignment
		} else {
			this.employerId = null;
		}
	}

    private int generateEmployerId() {
		// You can customize this logic
		return (int) (Math.random() * 10000); // Example random ID
	}

}















