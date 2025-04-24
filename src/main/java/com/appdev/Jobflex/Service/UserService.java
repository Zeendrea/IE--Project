package com.appdev. Jobflex.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.appdev. Jobflex.Repository.UserRepository;
import com.appdev. Jobflex.Entity.UserEntity;


@Service
public class UserService {

    @Autowired
    private UserRepository urepo;

    // Save user to database
    public UserEntity saveUser(UserEntity user) {
        return urepo.save(user);
    }
 
    // Get all users
    public List<UserEntity> getAllUser() {
        return urepo.findAll();
    }

    // Update user profile
    @SuppressWarnings("finally")
    public UserEntity updateUser(int userId, UserEntity newUserDetails) {
        UserEntity user = new UserEntity();
        try {
            user = urepo.findById(userId).get();  // Find user by ID

            // Update the user details
            user.setName(newUserDetails.getName());
            user.setEmail(newUserDetails.getEmail());
            user.setPassword(newUserDetails.getPassword());
            user.setAddress(newUserDetails.getAddress());
            user.setPhone(newUserDetails.getPhone());
            user.setUserType(newUserDetails.getUserType());

            // Update the profile image if it's not null
            if (newUserDetails.getProfileImage() != null) {
                // Set the new profile image path
                user.setProfileImage(newUserDetails.getProfileImage());
            }

        } catch (NoSuchElementException ex) {
            throw new NoSuchElementException("User with ID " + userId + " does not exist!");
        } finally {
            // Save the updated user to the database
            return urepo.save(user);
        }
    }

    // Delete a user
    public String deleteUser(int userId) {
        String msg = "";
        if (urepo.findById(userId).isPresent()) {
            urepo.deleteById(userId);
            msg = "User record successfully deleted!";
        } else {
            msg = "User with ID " + userId + " not found!";
        }
        return msg;
    }

    // Check if email already exists
    public boolean isEmailExists(String email) {
        return urepo.findByEmail(email) != null;
    }

    // Authenticate user
    public UserEntity authenticateUser(String email, String password) {
        UserEntity user = urepo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        throw new IllegalArgumentException("Invalid email or password");
    }

    // Find user by ID
    public Optional<UserEntity> findById(int userId) {
        return urepo.findById(userId);
    }

}

