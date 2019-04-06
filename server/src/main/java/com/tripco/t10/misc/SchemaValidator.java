package com.tripco.t10.misc;

import org.everit.json.schema.Schema;
import org.everit.json.schema.SchemaException;
import org.everit.json.schema.ValidationException;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/*
    The following code is taken mostly from these sites:
    https://github.com/csucs314s19/tripco/blob/master/guides/schema/SchemaExample/src/main/java/example/SchemaValidator.java
    https://github.com/everit-org/json-schema#quickstart
 */

public class SchemaValidator {

    private static final Logger log = LoggerFactory.getLogger(SchemaValidator.class);

    public JSONObject createRawSchema(String path) throws IOException {
        JSONObject rawSchema = new JSONObject("{}");
        try(InputStream inputstream = this.getClass().getResourceAsStream(path)) {
            rawSchema = new JSONObject(new JSONTokener(inputstream));
        } catch (JSONException e) {
            log.error("Caught exception when constructing JSON objects!");
            e.printStackTrace();
            throw e;
        } catch (IOException e) {
            log.error("Caught exception when reading files!");
            e.printStackTrace();
            throw e;
        }
        return rawSchema;
    }

    public boolean performValidation(JSONObject json, String path) throws IOException {
        boolean validSchema = true;
        try {
            JSONObject rawSchema = createRawSchema(path);
            Schema schema = SchemaLoader.load(rawSchema);
            schema.validate(json);
        } catch (SchemaException e) {
            log.error("Caught a schema exception!");
            e.printStackTrace();
            validSchema = false;
            throw e;
        } catch (ValidationException e){
            log.error("Caught validation exception when validating schema! Root message: {}", e.getErrorMessage());
            log.error("All messages from errors (including nested):");
            // For now, messages are probably just good for debugging, to see why something failed
            List<String> allMessages = e.getAllMessages();
            for (String message : allMessages) {
                log.error(message);
            }
            validSchema = false;
            throw e;
        }
        return validSchema;
    }
}