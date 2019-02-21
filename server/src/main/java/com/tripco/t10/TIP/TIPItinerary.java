package com.tripco.t10.TIP;

import com.tripco.t10.misc.GreatCircleDistance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import java.util.ArrayList;

public class TIPItinerary extends TIPHeader{
    private JsonObject options;
    private JsonArray places;
    private ArrayList<Integer> distances;

    private final transient Logger log = LoggerFactory.getLogger(TIPItinerary.class);

    TIPItinerary(int version, JsonObject options, JsonArray places, ArrayList<Integer> distances) {
        this();
        this.requestVersion = version;
        this.options = options;
        this.places = places;
        this.distances = distances;
    }

    private TIPItinerary() {
        this.requestType = "itinerary";
    }


    @Override
    public void buildResponse() {

        log.trace("buildResponse -> {}", this);
    }

    @Override
    public String toString() {
        Gson gson = new Gson();
        return "TIPItinerary{" +
                "options: " + gson.toJson(options) +
                "places: " + gson.toJson(places) +
                "distances" + gson.toJson(distances) +
                '}';
    }

}
