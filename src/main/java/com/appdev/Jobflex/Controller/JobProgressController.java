package com.appdev. Jobflex.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.appdev. Jobflex.Entity.JobProgress;
import com.appdev. Jobflex.Service.JobProgressService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/jobprogress")
public class JobProgressController {

    @Autowired
    private JobProgressService jobProgressService;

    // Create or register a new job progress entry
    @PostMapping("/register")
    public ResponseEntity<JobProgress> registerProgress(@RequestBody JobProgress jobProgress) {
        JobProgress savedProgress = jobProgressService.registerProgress(jobProgress);
        return new ResponseEntity<>(savedProgress, HttpStatus.CREATED);
    }

    // Get all job progress entries
    @GetMapping("/all")
    public ResponseEntity<List<JobProgress>> getAllProgresses() {
        List<JobProgress> progressList = jobProgressService.getAllProgresses();
        return new ResponseEntity<>(progressList, HttpStatus.OK);
    }

    // Update a specific job progress entry by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<JobProgress> updateProgress(@PathVariable Integer id, @RequestBody JobProgress updatedProgress) {
        JobProgress updatedJobProgress = jobProgressService.updateProgress(id, updatedProgress);
        return new ResponseEntity<>(updatedJobProgress, HttpStatus.OK);
    }

    // Delete a specific job progress entry by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProgress(@PathVariable Integer id) {
        jobProgressService.deleteProgress(id);
        return new ResponseEntity<>("Job progress deleted successfully", HttpStatus.OK);
    }
}

