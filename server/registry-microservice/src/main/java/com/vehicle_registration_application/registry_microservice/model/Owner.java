package com.vehicle_registration_application.registry_microservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required!")
    @Column(nullable = false)
    private String firstName;

    private String middleName;

    @NotBlank(message = "Last name is required!")
    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String ownerNic;

    @NotBlank(message = "Address Field Can not be empty!")
    @Column(nullable = false)
    private String address;

    @NotBlank(message = "Please add your mobile Number! ")
    @Column(nullable = false)
    private String phone;
}
