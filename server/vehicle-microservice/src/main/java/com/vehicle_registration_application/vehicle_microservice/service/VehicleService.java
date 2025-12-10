package com.vehicle_registration_application.vehicle_microservice.service;

import com.vehicle_registration_application.vehicle_microservice.dto.VehicleRequest;
import com.vehicle_registration_application.vehicle_microservice.model.Vehicle;

import java.util.List;

public interface VehicleService {
    Vehicle create(VehicleRequest request);
    Vehicle getById(Long id);
    List<Vehicle> getAll();
    Vehicle update(Long id, VehicleRequest request);
    void delete(Long id);

}
