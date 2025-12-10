package com.vehicle_registration_application.vehicle_microservice.serviceImp;

import com.vehicle_registration_application.vehicle_microservice.dto.VehicleRequest;
import com.vehicle_registration_application.vehicle_microservice.exception.DuplicateNumberPlate;
import com.vehicle_registration_application.vehicle_microservice.model.Vehicle;
import com.vehicle_registration_application.vehicle_microservice.repository.VehicleRepository;
import com.vehicle_registration_application.vehicle_microservice.service.VehicleService;
import com.vehicle_registration_application.vehicle_microservice.util.PlateUtils;
import com.vehicle_registration_application.vehicle_microservice.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleServiceImp implements VehicleService {

    private final VehicleRepository repository;

    @Override
    public Vehicle create(VehicleRequest request) {
        if (!PlateUtils.isValid(request.getLicensePlate()))
            throw new IllegalArgumentException("Invalid license plate!");
        if (repository.existsByLicensePlate(request.getLicensePlate()))
            throw new DuplicateNumberPlate("Already exists number plate!");

        // get number plate type
        String type = PlateUtils.classify(request.getLicensePlate());

        Vehicle vehicle = Vehicle.builder()
                .ownerNic(request.getOwnerNic())
                .licensePlate(request.getLicensePlate())
                .vehicleColor(request.getVehicleColor())
                .vehicleType(request.getVehicleType())
                .plateType(type)
                .build();
        return repository.save(vehicle);
    }

    @Override
    public Vehicle getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle with ID " + id + " not found!"));
    }

    public List<Vehicle> getAll() {
        return repository.findAll();
    }

    public Vehicle update(Long id, VehicleRequest request) {

        if (request.getOwnerNic() == null || request.getOwnerNic().isBlank()) {
            throw new IllegalArgumentException("Please select owner name.");
        }

        Vehicle veh = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle with ID " + id + " not found!"));
        veh.setOwnerNic(request.getOwnerNic());
        veh.setVehicleColor(request.getVehicleColor());
        veh.setVehicleType(request.getVehicleType());
        return repository.save(veh);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Vehicle with ID " + id + " not found!");
        }
        repository.deleteById(id);
    }
}
