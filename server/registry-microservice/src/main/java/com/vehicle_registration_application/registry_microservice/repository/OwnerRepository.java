package com.vehicle_registration_application.registry_microservice.repository;

import com.vehicle_registration_application.registry_microservice.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
    boolean existsByOwnerNic(String nic);
}
