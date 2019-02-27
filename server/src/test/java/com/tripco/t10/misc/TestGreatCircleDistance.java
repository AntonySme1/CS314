package com.tripco.t10.misc;

import org.junit.Test;

import java.lang.Math;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.MathContext;
import java.util.LinkedHashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class TestGreatCircleDistance {
    /*
        Testing for GreatCircleDistance:
            Tests will be checked in miles, kilometers, nautical miles, millimeters, and deciliters
            for earthRadius

            Tests will also include some basic builds that use miles for easy reference
     */

    @Test
    public void buildTest(){
        Map origin = new LinkedHashMap();
        origin.put("latitude", 0);
        origin.put("longitude", 0);

        Map destination = new LinkedHashMap();
        destination.put("latitude", 0);
        destination.put("longitude", 0);

        BigDecimal earthRadius = new BigDecimal(3959);

        GreatCircleDistance calculator = new GreatCircleDistance();
        assertEquals(0, calculator.calculateGreatCircleDistance(origin, destination, earthRadius).intValue());
    }

    @Test
    public void testCorners(){
        Map origin = new LinkedHashMap();
        origin.put("latitude", 0);
        origin.put("longitude", 0);

        Map destination = new LinkedHashMap();
        destination.put("latitude", 90);
        destination.put("longitude", 180);

        BigDecimal earthRadius = new BigDecimal(3959);

        GreatCircleDistance calculator = new GreatCircleDistance();
        assertEquals(6219, calculator.calculateGreatCircleDistance(origin, destination, earthRadius).intValue());
    }

    @Test
    public void edgeTest(){
        Map origin = new LinkedHashMap();
        origin.put("latitude", 45);
        origin.put("longitude", 90);

        Map destination = new LinkedHashMap();
        destination.put("latitude", -45);
        destination.put("longitude", -90);

        BigDecimal earthRadius = new BigDecimal(3959);

        GreatCircleDistance calculator = new GreatCircleDistance();
        assertEquals(12438, calculator.calculateGreatCircleDistance(origin, destination, earthRadius).intValue());
    }

    @Test
    public void testWithKilometers(){
        Map origin = new LinkedHashMap();
        origin.put("latitude", 45);
        origin.put("longitude", 90);

        Map destination = new LinkedHashMap();
        destination.put("latitude", -45);
        destination.put("longitude", -90);

        BigDecimal earthRadius = new BigDecimal(6371);

        GreatCircleDistance calculator = new GreatCircleDistance();
        assertEquals(20015, calculator.calculateGreatCircleDistance(origin, destination, earthRadius).intValue());
    }

//    @Test
//    public void testWithNauticalMiles(){
//        Map origin = new LinkedHashMap();
//        origin.put("latitude", 45);
//        origin.put("longitude", 90);
//
//        Map destination = new LinkedHashMap();
//        destination.put("latitude", -45);
//        destination.put("longitude", -90);
//
//        BigDecimal earthRadius = new BigDecimal(3440);
//
//        GreatCircleDistance calculator = new GreatCircleDistance();
//        assertEquals(5404, calculator.calculateGreatCircleDistance(origin, destination, earthRadius).intValue());
//    }

    @Test
    public void testMapsWithMultipleValues(){
        Map origin = new LinkedHashMap();
        origin.put("latitude", 40);
        origin.put("longitude", -150);
        origin.put("latitude", 50);
        origin.put("longitude", -150);

        Map destination = new LinkedHashMap();
        destination.put("latitude", 40);
        destination.put("longitude", -151);
        destination.put("latitude", 50);
        destination.put("longitude", -151);

        BigDecimal earthRadius = new BigDecimal(3958.761316);

        GreatCircleDistance calculator = new GreatCircleDistance();
        assertEquals(44, calculator.calculateGreatCircleDistance(origin, destination, earthRadius).intValue());
    }

}
