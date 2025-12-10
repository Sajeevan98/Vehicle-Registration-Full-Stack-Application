package com.vehicle_registration_application.registry_microservice.service;

import com.vehicle_registration_application.registry_microservice.dto.OwnerRequest;
import com.vehicle_registration_application.registry_microservice.model.Owner;

import java.util.List;

public interface OwnerService {

    Owner create(OwnerRequest request);
    List<Owner> getAll();
    Owner update(Long id, OwnerRequest request);
    Owner getById(Long id);
    void delete(Long id);
}
