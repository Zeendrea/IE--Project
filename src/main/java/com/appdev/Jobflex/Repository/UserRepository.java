package com.appdev. Jobflex.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev. Jobflex.Entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	UserEntity findByEmail(String email);
	Optional<UserEntity> findByGoogleId(String googleId);
}
