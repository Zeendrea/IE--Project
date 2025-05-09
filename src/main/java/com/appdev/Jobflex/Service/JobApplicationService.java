package com.appdev.Jobflex.Service;

import com.appdev.Jobflex.Entity.JobApplicationEntity;
import com.appdev.Jobflex.Entity.JobPostEntity;
import com.appdev.Jobflex.Repository.JobApplicationRepository;
import com.appdev.Jobflex.Repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobPostRepository jobPostRepository;

    public List<JobApplicationEntity> getApplicationsByJobId(int jobId, int userId) {
        // First verify this user is the employer for this job
        JobPostEntity jobPost = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));

        if (jobPost.getEmployer().getUserId() != userId) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to view these applications");
        }

        return jobApplicationRepository.findByJobPost_Id(jobId);
    }

    public void updateApplicationStatus(int applicationId, String status, int userId) {
        JobApplicationEntity application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found"));

        // Verify the user is the employer for this job
        if (application.getJobPost().getEmployer().getUserId() != userId) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to update this application");
        }

        // Validate status
        if (!status.equals("Pending") && !status.equals("Accepted") && !status.equals("Rejected")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status value");
        }

        application.setApplicationStatus(status);
        jobApplicationRepository.save(application);
    }
}