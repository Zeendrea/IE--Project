package com.appdev. Jobflex.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appdev. Jobflex.Entity.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
}
