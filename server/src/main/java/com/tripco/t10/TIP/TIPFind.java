package com.tripco.t10.TIP;

import com.google.gson.JsonArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TIPFind extends TIPHeader{
    private final transient Logger log = LoggerFactory.getLogger(TIPFind.class);

    private String match;
    private int limit;
    private int found;
    private JsonArray places;

    private TIPFind(){
        this.requestType = "find";
    }

    //limit is optional
    //limit = 0 as many places as possible
    //limit = 3 places will only get 3

    //match = "fort"

    //DB ->
    // Fort Collins
    // Fort ...
    TIPFind(int version, String match, int limit, int found, JsonArray places){
        this();
        this.requestVersion = version;
        this.match = match;
        this.limit = limit;
        this.found = found;
        this.places = places;
    }

    TIPFind(int version, String match, int found, JsonArray places){
        this();
        this.requestVersion = version;
        this.match = match;
        this.found = found;
        this.places = places;
    }

    @Override
    public void buildResponse() {
        log.trace("buildResponse -> {}", this);
    }
}
