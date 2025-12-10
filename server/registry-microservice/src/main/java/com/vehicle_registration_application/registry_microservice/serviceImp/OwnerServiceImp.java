package com.vehicle_registration_application.registry_microservice.serviceImp;

import com.vehicle_registration_application.registry_microservice.dto.OwnerRequest;
import com.vehicle_registration_application.registry_microservice.exception.DuplicateNicException;
import com.vehicle_registration_application.registry_microservice.exception.ResourceNotFoundException;
import com.vehicle_registration_application.registry_microservice.model.Owner;
import com.vehicle_registration_application.registry_microservice.repository.OwnerRepository;
import com.vehicle_registration_application.registry_microservice.service.OwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OwnerServiceImp implements OwnerService {

    private final OwnerRepository repository;

    public Owner create(OwnerRequest request) {
        if (repository.existsByOwnerNic(request.getOwnerNic())) {
            throw new DuplicateNicException("NIC already exists: " + request.getOwnerNic());
        }
        Owner owner = Owner.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .middleName(request.getMiddleName())
                .ownerNic(request.getOwnerNic())
                .address(request.getAddress())
                .phone(request.getPhone())
                .build();

        return repository.save(owner);
    }

    public List<Owner> getAll() {
        return repository.findAll();
    }

    public Owner update(Long id, OwnerRequest request) {
        Owner owner = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Owner with ID " + id + " not found"));

        owner.setFirstName(request.getFirstName());
        owner.setLastName(request.getLastName());
        owner.setMiddleName(request.getMiddleName());
        owner.setOwnerNic(request.getOwnerNic());
        owner.setAddress(request.getAddress());
        owner.setPhone(request.getPhone());

        return repository.save(owner);
    }

    @Override
    public Owner getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle with ID " + id + " not found!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id))
            throw new ResourceNotFoundException("Owner with ID " + id + " not found");

        repository.deleteById(id);
    }
}
