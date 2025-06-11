package com.appdev. Jobflex.Controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;


import com.appdev. Jobflex.Service.UserService;
import com.appdev. Jobflex.Entity.UserEntity;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userv;

	@GetMapping("/user-info")
	public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
		if (principal == null) {
			return ResponseEntity.status(401).body("Not authenticated");
		}

		// Create a response with all OAuth2 attributes
		Map<String, Object> response = new HashMap<>(principal.getAttributes());

		// Log the attributes to help with debugging
		System.out.println("OAuth2 Attributes: " + response);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/auth")
	public OAuth2User getUser(@AuthenticationPrincipal OAuth2User principal) {
		return principal;
	}
	@GetMapping("/auth/user-info")
	public Map<String, Object> getUserAttributes(@AuthenticationPrincipal OAuth2User principal) {
		return principal.getAttributes(); // includes userId, userType, etc.
	}


	@PostMapping("/add")
	public UserEntity addUser(@RequestBody UserEntity user) {
		return userv.saveUser(user);
	}
	
	@GetMapping("/getAllUser")
	public List<UserEntity> getAllUser() {
		return userv.getAllUser()
;	}
	
	@PutMapping("/updateUser")
	public UserEntity updateUser(@RequestParam int userId, @RequestBody UserEntity newUserDetails) {
		return userv.updateUser(userId, newUserDetails);
	}
	
	@DeleteMapping("/deleteUser/{userId}")
	public String deleteUser(@PathVariable int userId) {
		return userv.deleteUser(userId);
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserEntity> loginUser(@RequestBody Map<String, String> credentials) {
		String email = credentials.get("email");
		String password = credentials.get("password");
		UserEntity user = userv.authenticateUser(email, password);
		
		//Debugging: print the profile image URL
		System.out.println("Profile Image Path:" + user.getProfileImage());
		
		return ResponseEntity.ok(user);
	}
	
	//Newly added functions

	@PostMapping("/update-name")
	public ResponseEntity<?> updateName(@RequestBody Map<String, String> payload) {
	    int userId = Integer.parseInt(payload.get("userId"));
	    String name = payload.get("name");
	    
	    Optional<UserEntity> userOptional = userv.findById(userId); // Make sure your service has this method
	    if (userOptional.isPresent()) {
	        UserEntity user = userOptional.get();
	        user.setName(name);
	        userv.saveUser(user); // Save the updated user
	        return ResponseEntity.ok().body("Name updated successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	    }
	}
	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@RequestParam int userId, 
	                                       @RequestParam(required = false) MultipartFile profileImage,
	                                       @RequestParam String name,
	                                       @RequestParam String email,
	                                       @RequestParam String phone,
	                                       @RequestParam String address,
	                                       @RequestParam String password,
	                                       @RequestParam String userType) {
	    try {
	        // Handle profile image upload if exists
	        String imagePath = null;
	        if (profileImage != null && !profileImage.isEmpty()) {
	            imagePath = saveProfileImage(profileImage, userId); // Save the image to disk
	        }
	        
	        // Retrieve the user to update
	        Optional<UserEntity> userOptional = userv.findById(userId);
	        if (!userOptional.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	        }
	        
	        UserEntity user = userOptional.get();
	        // Update fields
	        user.setName(name);
	        user.setEmail(email);
	        user.setPhone(phone);
	        user.setAddress(address);
	        user.setPassword(password);
	        user.setUserType(userType);
	        
	        // If an image was uploaded, update the profile image path
	        if (imagePath != null) {
	            user.setProfileImage(imagePath); // Save the profile image path
	        }
	        
	        // Save the updated user
	        userv.saveUser(user);  // Assuming saveUser persists the updated user

	        return ResponseEntity.ok().body("Profile updated successfully");
	    } catch (Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile: " + ex.getMessage());
	    }
	}

    // Method to save the uploaded image to the server
	private String saveProfileImage(MultipartFile profileImage, int userId) throws IOException {
	    // Define the absolute path to the uploads directory
		String uploadDir = "C:/Users/Ezzel/Downloads/profile_images/";

	    // Create the directory if it doesn't exist
	    File directory = new File(uploadDir);
	    if (!directory.exists()) {
	        boolean dirCreated = directory.mkdirs();  // Creates the folder if it doesn't exist
	        if (!dirCreated) {
	            throw new IOException("Failed to create directory for profile images.");
	        }
	    }

	    // Generate a unique filename (use userId to ensure uniqueness)
	    String imageFileName = userId + "_" + profileImage.getOriginalFilename();
	    File imageFile = new File(uploadDir + imageFileName);

	    // Log for debugging
	    System.out.println("Saving profile image to: " + imageFile.getAbsolutePath());

	    // Save the image to the directory
	    profileImage.transferTo(imageFile);

	    // Return the relative path of the uploaded image
	    return "uploads/profile_images/" + imageFileName;
	}



	@PutMapping("/update-role")
	public ResponseEntity<?> updateRole(@RequestBody Map<String, Object> payload) {
		int userId = Integer.parseInt(payload.get("userId").toString());
		String userType = payload.get("userType").toString();

		Optional<UserEntity> userOptional = userv.findById(userId);
		if (userOptional.isPresent()) {
			UserEntity user = userOptional.get();
			user.setUserType(userType); // Set the userType (role)
			userv.saveUser(user); // Save the updated user
			return ResponseEntity.ok().body("Role updated successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
	}

}
