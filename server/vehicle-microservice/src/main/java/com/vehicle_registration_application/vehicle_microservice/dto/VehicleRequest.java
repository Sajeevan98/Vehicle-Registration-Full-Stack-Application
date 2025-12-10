package com.vehicle_registration_application.vehicle_microservice.dto;

import lombok.Data;

@Data
public class VehicleRequest {
    private String licensePlate;
    private String plateType;
    private String vehicleColor;
    private String vehicleType;
    private String ownerNic;
}
