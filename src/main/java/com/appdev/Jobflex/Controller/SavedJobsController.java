package com.appdev.Jobflex.Controller;

import com.appdev.Jobflex.Entity.JobSaveEntity;
import com.appdev.Jobflex.Repository.JobSaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SavedJobsController {

    @Autowired
    private JobSaveRepository jobSaveRepository;

    @GetMapping("/savedJobs/{userId}")
    public List<JobSaveEntity> getSavedJobs(@PathVariable Integer userId) {
        return jobSaveRepository.findByUser_UserId(userId); // Assuming there's a method in the repository to fetch saved jobs by user ID
    }
}
