package com.vehicle_registration_application.registry_microservice.utils;

import java.util.regex.Pattern;

public class NicValidator {

    // Old NIC: 9 digits + uppercase V
    private static final Pattern OLD_NIC = Pattern.compile("^[0-9]{9}V$");

    // New NIC: 12 digits
    private static final Pattern NEW_NIC = Pattern.compile("^[0-9]{12}$");

    public static boolean isValidNIC(String nic) {
        if (nic == null)
            return false;
        nic = nic.trim().toUpperCase();

        return OLD_NIC.matcher(nic).matches() || NEW_NIC.matcher(nic).matches();
    }
}
