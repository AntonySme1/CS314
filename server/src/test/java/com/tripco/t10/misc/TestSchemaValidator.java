package com.tripco.t10.misc;

import org.json.JSONObject;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class TestSchemaValidator {
    @Test
    public void configBadResponseSchemaTest() {
        SchemaValidator sv = new SchemaValidator();
        JSONObject badConfig = new JSONObject("{}");
        boolean isValid = sv.performValidation(badConfig, "/TIPConfigSchema.json");
        assertFalse(isValid);
    }
}
