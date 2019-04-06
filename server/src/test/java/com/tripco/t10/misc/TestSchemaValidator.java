package com.tripco.t10.misc;

import org.json.JSONObject;
import org.junit.Test;

import static org.junit.Assert.*;

public class TestSchemaValidator {

    @Test
    public void configBadResponseSchemaTest() {
        SchemaValidator sv = new SchemaValidator();
        JSONObject badConfig = new JSONObject("{}");
        boolean isValid = sv.performValidation(badConfig, "/TIPConfigSchema.json");
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
        JSONObject goodConfig = new JSONObject(configResponse);
        boolean isValid = sv.performValidation(goodConfig, "/TIPConfigSchema.json");
        assertTrue(isValid);
    }
}

