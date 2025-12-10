package com.vehicle_registration_application.vehicle_microservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String licensePlate; // vehicle-number

    private String plateType; // vintage, old, modern
    private String vehicleColor;
    private String vehicleType; // bike, car, van, etc.
    private String ownerNic;

}
