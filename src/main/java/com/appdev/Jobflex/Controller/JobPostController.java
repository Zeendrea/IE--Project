package com.appdev.Jobflex.Controller;

import com.appdev.Jobflex.Entity.JobPostEntity;
import com.appdev.Jobflex.Entity.UserEntity;
import com.appdev.Jobflex.Repository.JobPostRepository;
import com.appdev.Jobflex.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
public class JobPostController {

    @Autowired
    private JobPostRepository jobPostRepository;

    @Autowired
    private UserRepository userRepository;

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

        jobPostRepository.save(existingJob);
        return "Job updated successfully.";
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteJob(@PathVariable int id, @RequestParam int userId) {
        Optional<JobPostEntity> jobOpt = jobPostRepository.findById(id);
        if (!jobOpt.isPresent()) {
            return "Job not found.";
        }

        JobPostEntity job = jobOpt.get();
        if (job.getEmployer() == null || job.getEmployer().getUserId() != userId) {
            return "You can only delete your own job posts.";
        }

        jobPostRepository.deleteById(id);
        return "Job deleted successfully.";
    }
}
