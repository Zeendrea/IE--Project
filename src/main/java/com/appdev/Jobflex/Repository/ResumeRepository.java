package com.appdev.Jobflex.Repository;

import com.appdev.Jobflex.Entity.ResumeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<ResumeEntity, Integer> {
    Optional<ResumeEntity> findByUser_UserId(int userId);
}