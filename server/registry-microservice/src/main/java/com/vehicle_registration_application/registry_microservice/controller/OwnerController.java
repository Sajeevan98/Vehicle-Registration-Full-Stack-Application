package com.vehicle_registration_application.registry_microservice.controller;

import com.vehicle_registration_application.registry_microservice.dto.OwnerRequest;
import com.vehicle_registration_application.registry_microservice.model.Owner;
import com.vehicle_registration_application.registry_microservice.service.OwnerService;
import com.vehicle_registration_application.registry_microservice.utils.NicValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/registry")
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService service;

    @PostMapping
    public Owner create(@RequestBody OwnerRequest request) {
        return service.create(request);
    }

    @GetMapping ("/{id}")
    public Owner getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping
    public List<Owner> getAll() {
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Owner update(@PathVariable Long id, @RequestBody OwnerRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Owner deleted successfully,";
    }

    @GetMapping("/validate")
    public Boolean isValid(@RequestParam String nic) {
        return NicValidator.isValidNIC(nic);
    }
}
