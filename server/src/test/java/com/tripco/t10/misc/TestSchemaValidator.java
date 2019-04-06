package com.tripco.t10.misc;

import org.json.JSONObject;
import org.junit.Test;

import static org.junit.Assert.*;

public class TestSchemaValidator {

    @Test
    public void configBadResponseSchemaTest() {
        SchemaValidator sv = new SchemaValidator();
        JSONObject badConfigResponse = new JSONObject("{}");
        boolean isValid = sv.performValidation(badConfigResponse, "/TIPConfigSchema.json");
        assertFalse(isValid);
    }

    @Test
    public void configGoodResponseSchemaTest() {
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
    }

    @Test
    public void distanceGoodRequestSchemaTest() {
        String distanceRequest = "{" +
                "\"requestType\"    : \"distance\"," +
                "\"requestVersion\" : 4," +
                "\"origin\"         : {\"latitude\":  \"40.6\", \"longitude\": \"-105.1\", \"name\":\"Fort Collins, Colorado, USA\"}," +
                "\"destination\"    : {\"latitude\": \"-33.9\", \"longitude\":  \"151.2\", \"name\":\"Sydney, New South Wales, Australia\"}," +
                "\"earthRadius\"    : 3958.8," +
                "\"distance\"       : 0" +
        "}";
        SchemaValidator sv = new SchemaValidator();
        JSONObject goodDistanceRequest = new JSONObject(distanceRequest);
        boolean isValid = sv.performValidation(goodDistanceRequest, "/TIPDistanceSchema");
        assertTrue(isValid);
    }
}

