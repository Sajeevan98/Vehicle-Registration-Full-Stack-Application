package com.vehicle_registration_application.vehicle_microservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateNumberPlate extends RuntimeException {
    public DuplicateNumberPlate(String message) {
        super(message);
    }
}