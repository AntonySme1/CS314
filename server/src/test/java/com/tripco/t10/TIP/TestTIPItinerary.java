package com.tripco.t10.TIP;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.JsonObject;
import com.google.gson.JsonArray;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestTIPItinerary {
    private JsonObject options;
    private JsonArray places;
    private int[] distances;

    @Before
    public void addPropertiesForItinerary(){
        options = new JsonObject();
        places = new JsonArray();
    }

    public JsonObject fillDenver(){
        JsonObject denver = new JsonObject();
        denver.addProperty("id", "dnvr");
        denver.addProperty("name", "Denver");
        denver.addProperty("latitude", 39.7392);
        denver.addProperty("longitude",-104.9903);
        return denver;
    }

    public JsonObject fillBoulder(){
        JsonObject boulder = new JsonObject();
        boulder.addProperty("id", "bldr");
        boulder.addProperty("name", "Boulder");
        boulder.addProperty("latitude", 40.01499);
        boulder.addProperty("longitude",-105.27055);
        return boulder;
    }

    public JsonObject fillFoco(){
        JsonObject foco = new JsonObject();
        foco.addProperty("id", "foco");
        foco.addProperty("name", "Fort Collins");
        foco.addProperty("latitude", 40.585258);
        foco.addProperty("longitude",-105.084419);
        return foco;
    }

    @Test
    public void testResponse(){
        //fill options object
        options.addProperty("title", "My Trip");
        options.addProperty("earthRadius", 3958.761316);

        //fill places array with jsonobjects
       JsonObject denver = this.fillDenver();
       JsonObject boulder = this.fillBoulder();
       JsonObject foco = this.fillFoco();

        places.add(denver);
        places.add(boulder);
        places.add(foco);

//        distances = new int[places.size()];

        TIPItinerary itinerary1 = new TIPItinerary(options, places, distances);
        TIPItinerary itinerary2 = new TIPItinerary(options, places);
        itinerary1.buildResponse();
        itinerary2.buildResponse();

        int[] expected = {24, 41, 59};

        int[] itinDist = itinerary2.getDistances();
        if(itinDist.length == expected.length && itinDist.length == distances.length) {
            for (int i = 0; i < distances.length; ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected[i], distances[i]);
                assertEquals("Expect Objects to have the same information", itinDist[i], distances[i]);
            }
        } else {
            fail("Test Response failed");
        }

    }

    @Test
    public void testOnePlace(){
        //fill options object
        options.addProperty("title", "My Trip");
        options.addProperty("earthRadius", 3958.761316);

        //fill places array with jsonobjects
        JsonObject denver = this.fillDenver();
        places.add(denver);

//        distances = new int[places.size()];

        TIPItinerary itinerary = new TIPItinerary(options, places, distances);
        int[] expected = {0};

        int[] itinDist = itinerary.getDistances();
        if(itinDist.length == expected.length) {
            for (int i = 0; i < itinDist.length; ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected[i], itinDist[i]);
            }
        } else {
            fail("Testing with one place failed");
        }

    }

    @Test
    public void testZeroPlaces(){
        //fill options object
        options.addProperty("title", "My Trip");
        options.addProperty("earthRadius", 3958.761316);

//        distances = new int[places.size()];

        TIPItinerary itinerary = new TIPItinerary(options, places, distances);
        itinerary.buildResponse();
        int[] expected = new int[0];
        int[] itinDist = itinerary.getDistances();

        if(itinDist.length == expected.length) {
            for (int i = 0; i < itinDist.length; ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected[i], itinDist[i]);
            }
        } else {
            fail("Test zero places failed");
        }
    }

    @Test
    public void testResponseWithKM(){
        //fill options object
        options.addProperty("title", "My Trip");
        options.addProperty("earthRadius", 6371.00877);

        //fill places array with jsonobjects
        JsonObject denver = this.fillDenver();
        JsonObject boulder = this.fillBoulder();
        JsonObject foco = this.fillFoco();

        places.add(denver);
        places.add(boulder);
        places.add(foco);

//        distances = new int[places.size()];

        TIPItinerary itinerary = new TIPItinerary(options, places, distances);
        itinerary.buildResponse();
        int[] d = itinerary.getDistances();
        for(int i = 0; i < d.length; i++){
            System.out.println("D: " + d[i]);
            System.out.println("Distances: " + distances[i]);
        }



        int[] expected = {39, 65, 94};

        if(distances.length == expected.length) {
            for (int i = 0; i < distances.length; ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected[i], distances[i]);
            }
        } else {
            fail("Test with KM failed");
        }

    }

    @Test
    public void testResponseWithNauticalMiles(){
        //fill options object
        options.addProperty("title", "My Trip");
        options.addProperty("earthRadius", 3440.069530);

        //fill places array with jsonobjects
        JsonObject denver = this.fillDenver();
        JsonObject boulder = this.fillBoulder();
        JsonObject foco = this.fillFoco();

        places.add(denver);
        places.add(boulder);
        places.add(foco);

        distances = new int[places.size()];

        TIPItinerary itinerary = new TIPItinerary(options, places, distances);
//        TIPItinerary itinerary = new TIPItinerary(options, places);
        itinerary.buildResponse();
        int[] expected = {21, 35, 51};

        if(distances.length == expected.length) {
            for (int i = 0; i < distances.length; ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected[i], distances[i]);
            }
        } else {
            fail("Test with Nautical Miles failed");
        }

    }

}
