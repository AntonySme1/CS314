package com.tripco.t10.misc;

import java.lang.Math;

/** Determines the distance between geographic coordinates.
 */
public class GreatCircleDistance {
    /** code below from https://rosettacode.org/wiki/Haversine_formula#Java and modified for project as needed
     * */

    public static double calculateGreatCircleDistance(double lat1, double lon1, double lat2, double lon2, double earthRadius) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        lat1 = Math.toRadians(lat1);
        lat2 = Math.toRadians(lat2);

        double a = Math.pow(Math.sin(dLat / 2),2) + Math.pow(Math.sin(dLon / 2),2) * Math.cos(lat1) * Math.cos(lat2);
        double c = 2 * Math.asin(Math.sqrt(a));
        return earthRadius * c;
    }


    @Override
    public String toString() {
        return "GreatCircleDistance{}";
    }
}
