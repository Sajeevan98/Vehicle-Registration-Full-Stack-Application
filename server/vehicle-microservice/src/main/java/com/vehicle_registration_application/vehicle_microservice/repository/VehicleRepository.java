package com.vehicle_registration_application.vehicle_microservice.repository;

import com.vehicle_registration_application.vehicle_microservice.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    boolean existsByLicensePlate(String licensePlate);
}

