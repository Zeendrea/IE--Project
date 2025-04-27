package com.appdev.Jobflex.Controller;

import com.appdev.Jobflex.Entity.JobApplicationEntity;
import com.appdev.Jobflex.Entity.JobPostEntity;
import com.appdev.Jobflex.Entity.UserEntity;
import com.appdev.Jobflex.Repository.JobApplicationRepository;
import com.appdev.Jobflex.Repository.JobPostRepository;
import com.appdev.Jobflex.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class JobApplicationController {
    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobPostRepository jobPostRepository;

    @PostMapping("/apply")
    public String applyForJob(@RequestParam int userId, @RequestParam int jobPostId) {
        //UserEntity user = userRepository.findById(userId).orElse(null);
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobPostEntity jobPost = jobPostRepository.findById(jobPostId).orElse(null);

        if (user == null || jobPost == null) {
            return "User or Job not found.";
        }

        if (!"Job Seeker".equalsIgnoreCase(user.getUserType())) {
            return "Only Job Seekers can apply.";
        }

        // NEW: create application and automatically set applicantName + jobTitle
        JobApplicationEntity application = new JobApplicationEntity(user, jobPost);

        jobApplicationRepository.save(application);

        return "Application submitted successfully!";
    }

    @GetMapping("/applications/{userId}")
    public ResponseEntity<List<JobApplicationEntity>> getUserApplications(@PathVariable int userId) {
        List<JobApplicationEntity> applications = jobApplicationRepository.findByApplicant_UserId(userId);

        if (applications.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(applications, HttpStatus.OK);
    }



}
