package com.appdev.Jobflex.Repository;

import com.appdev.Jobflex.Entity.JobApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplicationEntity, Integer> {
    //List<JobApplicationEntity> findByApplicantUserId(int userId);
    //List<JobApplicationEntity> findByApplicantId(int userId);
    List<JobApplicationEntity> findByApplicant_UserId(int userId);
    Optional<JobApplicationEntity> findByApplicant_UserIdAndJobPostId(int userId, int jobPostId);

}
