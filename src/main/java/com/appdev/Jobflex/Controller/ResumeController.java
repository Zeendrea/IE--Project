package com.appdev.Jobflex.Controller;

import com.appdev.Jobflex.Entity.ResumeEntity;
import com.appdev.Jobflex.Entity.UserEntity;
import com.appdev.Jobflex.Repository.ResumeRepository;
import com.appdev.Jobflex.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getResume(@PathVariable int userId) {
        Optional<ResumeEntity> resume = resumeRepository.findByUser_UserId(userId);

        if (resume.isPresent()) {
            return ResponseEntity.ok(resume.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resume not found");
        }
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveResume(@RequestBody Map<String, Object> payload) {
        try {
            // Extract userId from payload
            int userId = (int) payload.get("userId");

            // Find the user
            UserEntity user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

            // Check if user is a job seeker
            if (!"Job Seeker".equalsIgnoreCase(user.getUserType())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only job seekers can create resumes");
            }

            // Find existing resume or create new one
            ResumeEntity resume = resumeRepository.findByUser_UserId(userId)
                    .orElse(new ResumeEntity());

            // Set user
            resume.setUser(user);

            // Update resume fields from payload
            if (payload.containsKey("summary")) resume.setSummary((String) payload.get("summary"));
            if (payload.containsKey("skills")) resume.setSkills((String) payload.get("skills"));
            if (payload.containsKey("education")) resume.setEducation((String) payload.get("education"));
            if (payload.containsKey("experience")) resume.setExperience((String) payload.get("experience"));
            if (payload.containsKey("certifications")) resume.setCertifications((String) payload.get("certifications"));
            if (payload.containsKey("languages")) resume.setLanguages((String) payload.get("languages"));
            if (payload.containsKey("portfolioUrl")) resume.setPortfolioUrl((String) payload.get("portfolioUrl"));
            if (payload.containsKey("linkedinUrl")) resume.setLinkedinUrl((String) payload.get("linkedinUrl"));
            if (payload.containsKey("githubUrl")) resume.setGithubUrl((String) payload.get("githubUrl"));
            if (payload.containsKey("additionalInfo")) resume.setAdditionalInfo((String) payload.get("additionalInfo"));

            // Save resume
            resumeRepository.save(resume);

            return ResponseEntity.ok("Resume saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving resume: " + e.getMessage());
        }
    }

    // Get resume for employer to view
    @GetMapping("/view/{applicantId}")
    public ResponseEntity<?> viewApplicantResume(
            @PathVariable int applicantId,
            @RequestParam int employerId) {

        // Check if the requester is an employer
        UserEntity employer = userRepository.findById(employerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employer not found"));

        if (!"Employer".equalsIgnoreCase(employer.getUserType())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only employers can view applicant resumes");
        }

        // Get the applicant's resume
        Optional<ResumeEntity> resume = resumeRepository.findByUser_UserId(applicantId);

        if (resume.isPresent()) {
            return ResponseEntity.ok(resume.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resume not found for this applicant");
        }
    }
}