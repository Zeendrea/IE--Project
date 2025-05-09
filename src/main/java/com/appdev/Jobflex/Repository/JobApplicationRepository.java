package com.appdev.Jobflex.Repository;

import com.appdev.Jobflex.Entity.JobApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplicationEntity, Integer> {
    List<JobApplicationEntity> findByApplicant_UserId(int userId);
    Optional<JobApplicationEntity> findByApplicant_UserIdAndJobPostId(int userId, int jobPostId);
    List<JobApplicationEntity> findByJobPost_Id(int jobPostId);

    @Modifying
    @Query("DELETE FROM JobApplicationEntity j WHERE j.jobPost.id = :jobPostId")
    void deleteByJobPostId(int jobPostId);

    long countByJobPost_Id(int jobId);

    @Query("SELECT ja FROM JobApplicationEntity ja JOIN FETCH ja.applicant WHERE ja.jobPost.id = :jobPostId")
    List<JobApplicationEntity> findByJobPostIdWithApplicant(int jobPostId);
}