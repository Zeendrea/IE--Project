package com.appdev. Jobflex.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev. Jobflex.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	UserEntity findByEmail(String email);
}
