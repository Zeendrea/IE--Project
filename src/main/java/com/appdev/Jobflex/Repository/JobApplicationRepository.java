package com.appdev.Jobflex.Repository;

import com.appdev.Jobflex.Entity.JobApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplicationEntity, Integer> {
    //List<JobApplicationEntity> findByApplicantUserId(int userId);
    //List<JobApplicationEntity> findByApplicantId(int userId);
    List<JobApplicationEntity> findByApplicant_UserId(int userId);

}
