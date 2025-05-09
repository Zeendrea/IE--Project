package com.appdev.Jobflex.Controller;

import com.appdev.Jobflex.Entity.JobApplicationEntity;
import com.appdev.Jobflex.Entity.JobCategory;
import com.appdev.Jobflex.Entity.JobPostEntity;
import com.appdev.Jobflex.Entity.UserEntity;
import com.appdev.Jobflex.Repository.JobApplicationRepository;
import com.appdev.Jobflex.Repository.JobPostRepository;
import com.appdev.Jobflex.Repository.JobSaveRepository;
import com.appdev.Jobflex.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobPostController {

    @Autowired
    private JobPostRepository jobPostRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobSaveRepository jobSaveRepository;

    // CREATE
    @PostMapping("/post")
    public String postJob(@RequestBody JobPostEntity jobPost, @RequestParam int userId) {
        UserEntity user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return "User not found.";
        }

        if (!"employer".equalsIgnoreCase(user.getUserType())) {
            return "Only employers can post jobs.";
        }

        // Set default status to OPEN if not specified
        if (jobPost.getStatus() == null || jobPost.getStatus().isEmpty()) {
            jobPost.setStatus("OPEN");
        }

        // Set the current timestamp as posted date
        jobPost.setPostedDate(LocalDateTime.now(ZoneId.systemDefault()));

        jobPost.setEmployer(user);
        jobPostRepository.save(jobPost);
        return "Job posted successfully.";
    }

    // READ - Get all jobs
    @GetMapping("/all")
    public List<JobPostEntity> getAllJobs() {
        return jobPostRepository.findAll();
    }

    // READ - Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable int id) {
        Optional<JobPostEntity> job = jobPostRepository.findById(id);

        if (job.isPresent()) {
            return ResponseEntity.ok(job.get());
        } else {
            return ResponseEntity.status(404).body("Job not found.");
        }
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public String updateJob(@PathVariable int id, @RequestBody JobPostEntity updatedJob, @RequestParam int userId) {
        Optional<JobPostEntity> existingJobOpt = jobPostRepository.findById(id);
        if (!existingJobOpt.isPresent()) {
            return "Job not found.";
        }

        UserEntity user = userRepository.findById(userId).orElse(null);
        if (user == null || !"employer".equalsIgnoreCase(user.getUserType())) {
            return "Only employers can update jobs.";
        }

        JobPostEntity existingJob = existingJobOpt.get();

        if (existingJob.getEmployer() == null || existingJob.getEmployer().getUserId() != userId) {
            return "You can only update your own job posts.";
        }

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setPay(updatedJob.getPay());
        existingJob.setJobType(updatedJob.getJobType());
        existingJob.setShiftAndSchedule(updatedJob.getShiftAndSchedule());
        existingJob.setDescription(updatedJob.getDescription());

        // Update category if provided
        if (updatedJob.getCategory() != null) {
            existingJob.setCategory(updatedJob.getCategory());
        }

        // Update status if provided
        if (updatedJob.getStatus() != null) {
            // Validate status value
            if (updatedJob.getStatus().equals("OPEN") || updatedJob.getStatus().equals("CLOSED")) {
                existingJob.setStatus(updatedJob.getStatus());
            }
        }

        // Don't update the postedDate - we want to keep the original post date
        // existingJob.setPostedDate(updatedJob.getPostedDate());

        jobPostRepository.save(existingJob);
        return "Job updated successfully.";
    }

    // DELETE with cascade deletion of applications
    @DeleteMapping("/delete/{id}")
    @Transactional
    public String deleteJob(@PathVariable int id, @RequestParam int userId) {
        Optional<JobPostEntity> jobOpt = jobPostRepository.findById(id);
        if (!jobOpt.isPresent()) {
            return "Job not found.";
        }

        JobPostEntity job = jobOpt.get();
        if (job.getEmployer() == null || job.getEmployer().getUserId() != userId) {
            return "You can only delete your own job posts.";
        }

        try {
            // Step 1: Delete all saved jobs referencing this job post
            jobSaveRepository.deleteByJobPostId(id);

            // Step 2: Delete all applications for this job
            jobApplicationRepository.deleteByJobPostId(id);

            // Step 3: Delete the job post itself
            jobPostRepository.deleteById(id);

            return "Job and all associated data deleted successfully.";
        } catch (Exception e) {
            return "Error deleting job: " + e.getMessage();
        }
    }

    // TOGGLE JOB STATUS
    @PutMapping("/toggle-status/{id}")
    public ResponseEntity<?> toggleJobStatus(@PathVariable int id, @RequestParam int userId) {
        Optional<JobPostEntity> jobOpt = jobPostRepository.findById(id);
        if (!jobOpt.isPresent()) {
            return ResponseEntity.status(404).body("Job not found.");
        }

        JobPostEntity job = jobOpt.get();

        // Verify owner
        if (job.getEmployer() == null || job.getEmployer().getUserId() != userId) {
            return ResponseEntity.status(403).body("You can only update your own job posts.");
        }

        // Toggle the status
        String newStatus = job.getStatus().equals("OPEN") ? "CLOSED" : "OPEN";
        job.setStatus(newStatus);
        jobPostRepository.save(job);

        // Return response with updated status information
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Job status updated successfully");
        response.put("jobId", job.getId());
        response.put("status", newStatus);

        return ResponseEntity.ok(response);
    }

    // GET JOB STATUS
    @GetMapping("/status/{id}")
    public ResponseEntity<?> getJobStatus(@PathVariable int id) {
        Optional<JobPostEntity> jobOpt = jobPostRepository.findById(id);
        if (!jobOpt.isPresent()) {
            return ResponseEntity.status(404).body("Job not found.");
        }

        JobPostEntity job = jobOpt.get();

        Map<String, Object> response = new HashMap<>();
        response.put("jobId", job.getId());
        response.put("title", job.getTitle());
        response.put("status", job.getStatus());
        response.put("postedDate", job.getPostedDate());
        response.put("category", job.getCategory());

        return ResponseEntity.ok(response);
    }

    // GET ALL CATEGORIES
    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        List<String> categories = Arrays.stream(JobCategory.values())
                .map(JobCategory::getDisplayName)
                .collect(Collectors.toList());

        return ResponseEntity.ok(categories);
    }

    // GET JOBS BY CATEGORY
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getJobsByCategory(@PathVariable String category) {
        List<JobPostEntity> jobs = jobPostRepository.findAll().stream()
                .filter(job -> job.getCategory() != null && job.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());

        return ResponseEntity.ok(jobs);
    }
}