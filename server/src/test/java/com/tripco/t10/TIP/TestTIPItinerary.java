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
  private final int version = 2;

  @Before
  public void addPropertiesForItinerary(){
   options = new JsonObject();
   places = new JsonArray();
   distances = new ArrayList<Integer>();

    //fill options object
    options.addProperty("title", "My Trip");
    options.addProperty("earthRadius", 3958.761316);

    //fill places array with jsonobjects
    JsonObject denver = new JsonObject();
    denver.addProperty("id", "dnvr");
    denver.addProperty("name", "Denver");
    denver.addProperty("latitude", 39.7392);
    denver.addProperty("longitude",-104.9903);

    JsonObject boulder = new JsonObject();
    boulder.addProperty("id", "bldr");
    boulder.addProperty("name", "Boulder");
    boulder.addProperty("latitude", 40.01499);
    boulder.addProperty("longitude",-105.27055);

    JsonObject foco = new JsonObject();
    foco.addProperty("id", "foco");
    foco.addProperty("name", "Fort Collins");
    foco.addProperty("latitude", 40.585258);
    foco.addProperty("longitude",-105.084419);

    places.add(denver);
    places.add(boulder);
    places.add(foco);
  }

  @Test
  public void testResponse(){
  TIPItinerary itinerary = new TIPItinerary(version, options, places, distances);
    itinerary.buildResponse();
    ArrayList<Integer> expected = new ArrayList<Integer>();
    expected.add(24);
    expected.add(41);
    expected.add(59);

    if(distances.size() == expected.size()) {
        for (int i = 0; i < distances.size(); ++i) {
            assertEquals("Expected distances are the same as the ItineraryObject", expected.get(i), distances.get(i));
        }
    }

  }

}
