package com.tripco.t10.misc;

import org.json.JSONObject;
import org.junit.Test;

import static org.junit.Assert.*;

public class TestSchemaValidator {

    public void configBadResponseSchemaTest() {
        //this test produces several error messages, add the @Test annotation if you would like to run this test
        try {
            SchemaValidator sv = new SchemaValidator();
            JSONObject badConfigResponse = new JSONObject("{}");
            boolean isValid = sv.performValidation(badConfigResponse, "/TIPConfigSchema.json");
            assertFalse(isValid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void configGoodResponseSchemaTest() {
        try {
            String configResponse = "{" +
                    "\"requestType\"        : \"config\"," +
                    "\"requestVersion\"     : 4," +
                    "\"serverName\"         : \"t## name\"," +
                    "\"placeAttributes\"    : [\"name\", \"latitude\", \"longitude\", \"id\", \"municipality\", \"region\", \"country\", \"continent\", \"altitude\"]," +
                    "\"optimizations\"      : [\"none\", \"short\", \"shorter\"]," +
                    "\"filters\"            : [{\"name\": \"type\"," +
                    "\"values\": [\"airport\",\"heliport\",\"balloonport\",\"closed\"]}" +
                    "]," +
                    "}";
            SchemaValidator sv = new SchemaValidator();
            JSONObject goodConfigResponse = new JSONObject(configResponse);
            boolean isValid = sv.performValidation(goodConfigResponse, "/TIPConfigSchema.json");
            assertTrue(isValid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void distanceGoodRequestSchemaTest() {
        try {
            String distanceRequest = "{" +
                    "\"requestType\"    : \"distance\"," +
                    "\"requestVersion\" : 4," +
                    "\"origin\"         : {\"latitude\":  \"40.6\", \"longitude\": \"-105.1\", \"name\":\"Fort Collins, Colorado, USA\"}," +
                    "\"destination\"    : {\"latitude\": \"-33.9\", \"longitude\":  \"151.2\", \"name\":\"Sydney, New South Wales, Australia\"}," +
                    "\"earthRadius\"    : 3958.8," +
                    "}";
            SchemaValidator sv = new SchemaValidator();
            JSONObject goodDistanceRequest = new JSONObject(distanceRequest);
            boolean isValid = sv.performValidation(goodDistanceRequest, "/TIPDistanceSchema.json");
            assertTrue(isValid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void itineraryGoodRequestSchemaTest() {
        try {
            String itineraryRequest = "{" +
                    "\"requestType\"    : \"itinerary\"," +
                    "\"requestVersion\" : 4," +
                    "\"options\"        : { \"title\":\"My Trip\"," +
                    "\"earthRadius\":\"3958.8\"," +
                    "\"optimization\":\"none\" }," +
                    "\"places\"         : [{\"name\":\"Denver\",       \"latitude\": \"39.7\", \"longitude\": \"-105.0\"}," +
                    "{\"name\":\"Boulder\",      \"latitude\": \"40.0\", \"longitude\": \"-105.4\"}," +
                    "{\"name\":\"Fort Collins\", \"latitude\": \"40.6\", \"longitude\": \"-105.1\"}]" +
                    "}";
            SchemaValidator sv = new SchemaValidator();
            JSONObject goodItineraryRequest = new JSONObject(itineraryRequest);
            boolean isValid = sv.performValidation(goodItineraryRequest, "/TIPItinerarySchema.json");
            assertTrue(isValid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void findGoodRequestSchemaTest() {
        try {
            String findRequest = "{" +
                    "\"requestType\"    :\"find\"," +
                    "\"requestVersion\" :4," +
                    "\"match\"          :\"fort collins\"," +
                    "\"narrow\"         :[]" +
            "}";
            SchemaValidator sv = new SchemaValidator();
            JSONObject goodFindRequest = new JSONObject(findRequest);
            boolean isValid = sv.performValidation(goodFindRequest, "/TIPFindSchema.json");
            assertTrue(isValid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}