package com.appdev. Jobflex.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev. Jobflex.Entity.JobProgress;

@Repository
public interface JobProgressRepository extends JpaRepository<JobProgress, Integer> {
}