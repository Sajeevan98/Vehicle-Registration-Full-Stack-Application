package com.vehicle_registration_application.vehicle_microservice.util;

public class PlateUtils {

    //    REGEX PATTERNS
    private static final String OLD = "^[0-9]{2}\\s*ශ්‍රී\\s*[0-9]{4}$";
    private static final String VINTAGE = "^([0-9]{2,3})\\s*-?\\s*([0-9]{4})$";
    private static final String MODERN = "^(?:[A-Z]{2}\\s)?([A-Z]{2,3})\\s*-?\\s*([0-9]{4})$";

    //    Validate license plate
    public static boolean isValid(String plate) {
        String p = normalize(plate);
        return p.matches(VINTAGE) || p.matches(OLD) || p.matches(MODERN);
    }

    //    Classify license plate
    public static String classify(String plate) {
        String p = normalize(plate);

        if (p.matches(VINTAGE)) return "vintage";
        if (p.matches(OLD)) return "old";
        if (p.matches(MODERN)) return "modern";

        return "unknown";
    }

    //    Remove extra spaces
    private static String normalize(String plate) {
        return plate.replaceAll("\\s+", " ").trim();
    }
}
