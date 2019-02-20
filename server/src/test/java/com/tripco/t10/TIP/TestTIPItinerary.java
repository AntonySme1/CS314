package com.tripco.t10.TIP;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestTIPItinerary {
  private JsonObject options;
  private JsonArray places;
  private ArrayList<Integer> distances;
  private TIPItinerary itinerary;

  @Before
  public void createConfigurationForTestCases(){
    //fill options object
    options.addProperty("title", "My Trip");
    options.addProperty("earthRadius", 3958.761316);

    //fill places array with jsonobjects
    JsonObject denver = new JsonObject();
    denver.addProperty("id", "dnvr");
    denver.addProperty("name", "Denver");
    denver.addProperty("latitude", 39);
    denver.addProperty("longitude",-104.9903);

    places.add(denver);

    //add information to distances array between cities
    distances.add(29);

    //create tip itinerary object
    itinerary.buildResponse();
  }

}
