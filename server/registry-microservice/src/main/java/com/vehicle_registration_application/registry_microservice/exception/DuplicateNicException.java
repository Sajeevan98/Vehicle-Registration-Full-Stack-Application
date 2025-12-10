package com.vehicle_registration_application.registry_microservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateNicException extends RuntimeException{
    public DuplicateNicException(String message) {
        super(message);
    }
}
