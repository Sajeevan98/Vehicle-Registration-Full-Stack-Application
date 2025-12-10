package com.vehicle_registration_application.vehicle_microservice.controller;

import com.vehicle_registration_application.vehicle_microservice.dto.VehicleRequest;
import com.vehicle_registration_application.vehicle_microservice.model.Vehicle;
import com.vehicle_registration_application.vehicle_microservice.service.VehicleService;
import com.vehicle_registration_application.vehicle_microservice.util.PlateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService service;

    // CREATE
    @PostMapping
    public Vehicle create(@RequestBody VehicleRequest request) {
        return service.create(request);
    }

    // READ BY ID
    @GetMapping ("/{id}")
    public Vehicle getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // READ ALL
    @GetMapping
    public List<Vehicle> getAll() {
        return service.getAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Vehicle update(@PathVariable Long id, @RequestBody VehicleRequest request) {
        return service.update(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Deleted successfully";
    }

    // VALIDATION API
    @GetMapping("/validate")
    public boolean validate(@RequestParam String plate) {
        return PlateUtils.isValid(plate);
    }

    // CLASSIFICATION API
    @GetMapping("/classify")
    public String classify(@RequestParam String plate) {
        return PlateUtils.classify(plate);
    }
}