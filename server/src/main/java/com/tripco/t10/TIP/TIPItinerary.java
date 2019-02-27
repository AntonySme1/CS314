package com.tripco.t10.TIP;

import com.tripco.t10.misc.GreatCircleDistance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

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

    public int calculateDistance(int position1, int position2){
        Map<String, Object> origin, destination;
        origin = new LinkedHashMap<>();
        destination = new LinkedHashMap<>();
        GreatCircleDistance haversine = new GreatCircleDistance();

        //base case, there are 0 or 1 places listed then return 0
        if(places.size() == 0 || places.size() == 1){
            destination = origin;
            return 0;
        }

        double originLatitude = getLatitude(position1);
        double originLongitude = getLongitude(position1);
        origin.put("latitude", originLatitude);
        origin.put("longitude", originLongitude);

        log.trace("Pos2: " + position2);
        double destLatitude = getLatitude(position2);
        double destLongitude = getLongitude(position2);
        destination.put("latitude", destLatitude);
        destination.put("longitude", destLongitude);

        return haversine.calculateGreatCircleDistance(origin, destination, getEarthRadius()).intValue();
    }

    //Code to extract data from Jsonarray from https://stackoverflow.com/questions/41354932/getting-a-value-from-a-jsonarray-using-gson
    public double getLatitude(int i){
        return places.get(i).getAsJsonObject().get("latitude").getAsDouble();
    }

    public double getLongitude(int i){
        return places.get(i).getAsJsonObject().get("longitude").getAsDouble();
    }

    public void fillDistances(){
        for(int i = 0; i < places.size(); ++i){
            int leg_distance = 0;
            if(i == places.size()-1){
                leg_distance = calculateDistance(i, 0);
            } else {
                leg_distance = calculateDistance(i, i + 1);
            }
            log.trace("Leg Distance[ " + i + "] = " + leg_distance);
            this.distances.add(leg_distance);
        }

    }

    Double getEarthRadius(){
        return options.getAsJsonObject().get("earthRadius").getAsDouble();
    }

    @Override
    public void buildResponse() {
        getEarthRadius();
        fillDistances();
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
