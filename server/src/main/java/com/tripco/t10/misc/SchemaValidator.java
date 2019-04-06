package com.tripco.t10.misc;

import org.everit.json.schema.Schema;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.InputStream;

/*
    The following code is taken mostly from these sites:
    https://github.com/csucs314s19/tripco/blob/master/guides/schema/SchemaExample/src/main/java/example/SchemaValidator.java
    https://github.com/everit-org/json-schema#quickstart
 */

public class SchemaValidator {

    private static final Logger log = LoggerFactory.getLogger(SchemaValidator.class);

    public boolean performValidation(JSONObject json, String path) {
        boolean validSchema = true;

        try(InputStream inputstream = this.getClass().getResourceAsStream(path)) {
            JSONObject rawSchema = new JSONObject(new JSONTokener(inputstream));
            Schema schema = SchemaLoader.load(rawSchema);
            schema.validate(json);
        } finally {
            return validSchema;
        }
    }
}