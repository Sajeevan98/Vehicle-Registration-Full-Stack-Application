package com.vehicle_registration_application.registry_microservice.dto;

import lombok.Data;

@Data
public class OwnerRequest {
    private String firstName;
    private String middleName;
    private String lastName;
    private String ownerNic;
    private String address;
    private String phone;
}
