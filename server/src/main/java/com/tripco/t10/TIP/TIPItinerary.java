package com.tripco.t10.TIP;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.tripco.t10.misc.GreatCircleDistance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

public class TIPItinerary extends TIPHeader{
    private JsonObject options;
    private JsonArray places;
    private ArrayList<Integer> distances = new ArrayList<>();

    private final transient Logger log = LoggerFactory.getLogger(TIPItinerary.class);

    private TIPItinerary() {
        this.requestType = "itinerary";
        this.requestVersion = 4;
    }

    //for testing purposes, optional distances
    TIPItinerary(JsonObject options, JsonArray places) {
        this();
        this.options = options;
        this.places = places;
    }

    TIPItinerary(JsonObject options, JsonArray places, ArrayList<Integer> distances) {
        this();
        this.options = options;
        this.places = places;
        this.distances = distances;
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

    public ArrayList<Integer> fillDistances(){
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
        return distances;
    }

    public Double getEarthRadius(){
        return options.getAsJsonObject().get("earthRadius").getAsDouble();
    }

    public void setOptimization(){
        String optimization;
        try {
            optimization = options.getAsJsonObject().get("optimizations").getAsString();
            options.addProperty("optimization", optimization);
        } catch(NullPointerException e){
            optimization = "none";
            options.addProperty("optimization", optimization);
        }
    }

    public ArrayList<Integer> getDistances(){
        return this.distances;
    }

    @Override
    public void buildResponse() {
        this.distances = fillDistances();
        log.trace("buildResponse -> {}", this);
        setOptimization();
    }
    public ArrayList<Integer>  nearestNeighbor(JsonArray places) {
        long shortestTourSize = Integer.MAX_VALUE;
        ArrayList<Integer> shortestTour = new ArrayList<>();
        ArrayList<Integer> currentTour = new ArrayList<>();
        for (int startingCity = 0; startingCity < places.size(); ++startingCity) {
            int currentCityIndex = 0;
            long currentTourLength = 0;
            boolean[] visitedCities = new boolean[places.size()];
            visitedCities[startingCity] = true;
            currentTour.add(startingCity);
            while (currentCityIndex < currentTour.size() - 1) {
                long closestNeighborDistance = Integer.MAX_VALUE;
                int closestNeighborIndex = -1;
                for (int i = 0; i < places.size(); ++i) {
                    closestNeighborIndex = i;
                }
                currentCityIndex = ++currentCityIndex;
                currentTour.add(closestNeighborIndex);
                currentTourLength += closestNeighborDistance;
                visitedCities[closestNeighborIndex] = true;
            }
            log.info("Tour Length: " + currentTour);
            if (currentTour.size() <= shortestTourSize){
                shortestTour = currentTour;
            }}
            return shortestTour;
        }


    @Override
    public String toString() {
        return "TIPItinerary{" +
                "options: " + options +
                "places: " + places +
                "distances: " + distances +
                '}';
    }
}
