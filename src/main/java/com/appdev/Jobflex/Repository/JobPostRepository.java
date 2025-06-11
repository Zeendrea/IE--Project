package com.appdev.Jobflex.Repository;

import com.appdev.Jobflex.Entity.JobPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostRepository extends JpaRepository<JobPostEntity, Integer> {

}
