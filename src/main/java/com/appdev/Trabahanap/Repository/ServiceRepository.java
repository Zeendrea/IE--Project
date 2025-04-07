package com.appdev.Trabahanap.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appdev.Trabahanap.Entity.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
}
