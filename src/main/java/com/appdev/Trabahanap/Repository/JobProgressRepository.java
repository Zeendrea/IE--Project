package com.appdev.Trabahanap.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.Trabahanap.Entity.JobProgress;

@Repository
public interface JobProgressRepository extends JpaRepository<JobProgress, Integer> {
}