package com.appdev.Trabahanap.Service;

import com.appdev.Trabahanap.Entity.JobProgress;
import com.appdev.Trabahanap.Repository.JobProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobProgressService {

    @Autowired
    private JobProgressRepository jobProgressRepository;

    // Create or register a new job progress entry
    public JobProgress registerProgress(JobProgress jobProgress) {
        return jobProgressRepository.save(jobProgress);
    }

    // Get all job progress entries
    public List<JobProgress> getAllProgresses() {
        return jobProgressRepository.findAll();
    }

    // Update a specific job progress entry by ID
    public JobProgress updateProgress(Integer id, JobProgress updatedProgress) {
        Optional<JobProgress> existingProgress = jobProgressRepository.findById(id);
        if (existingProgress.isPresent()) {
            JobProgress progress = existingProgress.get();
            progress.setStatus(updatedProgress.getStatus());
            progress.setComment(updatedProgress.getComment());
            progress.setUpdateTime(updatedProgress.getUpdateTime());
            return jobProgressRepository.save(progress);
        } else {
            throw new RuntimeException("Job progress not found with ID: " + id);
        }
    }

    // Delete a specific job progress entry by ID
    public void deleteProgress(Integer id) {
        if (jobProgressRepository.existsById(id)) {
            jobProgressRepository.deleteById(id);
        } else {
            throw new RuntimeException("Job progress not found with ID: " + id);
        }
    }
}

