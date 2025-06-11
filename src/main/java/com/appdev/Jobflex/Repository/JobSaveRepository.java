package com.appdev.Jobflex.Repository;

import com.appdev.Jobflex.Entity.JobPostEntity;
import com.appdev.Jobflex.Entity.JobSaveEntity;
import com.appdev.Jobflex.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobSaveRepository extends JpaRepository<JobSaveEntity, Integer> {
    Optional<JobSaveEntity> findByUserAndJobPost(UserEntity user, JobPostEntity jobPost);
    List<JobSaveEntity> findAllByUser(UserEntity user);
    List<JobSaveEntity> findByUser_UserId(Integer userId);
}
