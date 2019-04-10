package com.tripco.t10.TIP;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

/** This class defines the Config response that provides the client
 * with server specific configuration information.
 *  
 * When used with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to set the configuration information.
 * The MicroServer constructs the response JSON from the object using GSON.
 *  
 * When used for testing purposes,
 * An object is created using the constructor below.
 * The buildResponse method is called to set the configuration information.
 * The getDistance method is called to obtain the distance value for comparisons.
 */
public class TIPConfig extends TIPHeader {
  private String serverName;
  private List<String> placeAttributes;
  private List<String> optimizations;

  private final transient Logger log = LoggerFactory.getLogger(TIPConfig.class);


  public TIPConfig() {
    this.requestType = "config";
    this.requestVersion = 3;
  }


  @Override
  public void buildResponse() {
    this.serverName = "T10 finiteLoop";
    this.placeAttributes = Arrays.asList("name", "latitude", "longitude", "id", "municipality", "altitude");
    this.optimizations = Arrays.asList("none", "short");
    log.trace("buildResponse -> {}", this);
  }


  String getServerName() {
    return this.serverName;
  }


  List<String> getPlaceAttributes() {
    return this.placeAttributes;
  }

  List<String> getOptimizations() {
    return this.optimizations;
  }

  @Override
  public String toString() {
    return "TIPConfig{" +
            "serverName='" + serverName + '\'' +
            ", placeAttributes=" + placeAttributes +
            ", optimizations=" + optimizations +
            '}';
  }

}

 /*public static Integer[] nearestNeighbor(Object[] inputPlaces)
        {
        double earthRadius = Double.parseDouble((String) this.options.get("earthRadius"));
        long shortestTourLength = Integer.MAX_VALUE;
        Integer[] shortestTourIndexes = new Integer[inputPlaces.length];
        Integer[] currentTourIndex = new Integer[inputPlaces.length];
        long[][] distances = GreatCircleDistance.getDistance(inputPlaces, shortestTourIndexes, earthRadius);
        for(int startingCity = 0; startingCity < inputPlaces.length; ++startingCity)
        {
        int currentCityIndex = 0;
        long currentTourLength = 0;
        boolean[] visitedCities = new boolean[inputPlaces.length];
        visitedCities[startingCity] = true;
        currentTourIndex[currentCityIndex] = startingCity;
        while(currentCityIndex < currentTourIndex.length-1)
        {
        long closestNeighborDistance = Integer.MAX_VALUE;
        int closestNeighborIndex = -1;
        for(int i = 0; i < inputPlaces.length; ++i)
        {
        long distanceToNeighbor = distances[currentTourIndex[currentCityIndex]][i];
        if(!visitedCities[i] && distanceToNeighbor < closestNeighborDistance)
        {
        closestNeighborDistance = distanceToNeighbor;
        closestNeighborIndex = i;
        }
        }
        currentCityIndex=++currentCityIndex;
        currentTourIndex[currentCityIndex] = closestNeighborIndex;
        currentTourLength+=closestNeighborDistance;
        visitedCities[closestNeighborIndex] = true;
        }
        currentTourLength+=distances[currentTourIndex[0]][currentTourIndex[currentTourIndex.length-1]];
        log.info("Tour Length: " + currentTourLength);
        if(currentTourLength < shortestTourLength){
        shortestTourIndexes = currentTourIndex;
        }
        }
        return shortestTourIndexes;
        }
        */

