package com.appdev.Trabahanap.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.Trabahanap.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	UserEntity findByEmail(String email);
}
