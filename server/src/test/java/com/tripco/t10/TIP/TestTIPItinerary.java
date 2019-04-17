package com.tripco.t10.TIP;

import com.google.gson.JsonElement;
import org.junit.Before;
import org.junit.Test;

import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import java.util.ArrayList;
import java.util.Iterator;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestTIPItinerary {
    private JsonObject options;
    private JsonArray places;
    private ArrayList<Integer> distances;
    @Before
    public void addPropertiesForItinerary(){
        options = new JsonObject();
        places = new JsonArray();
        distances = new ArrayList<>();
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

        TIPItinerary itinerary1 = new TIPItinerary(options, places, distances);
        TIPItinerary itinerary2 = new TIPItinerary(options, places);
        itinerary1.buildResponse();
        itinerary2.buildResponse();

        ArrayList<Integer> expected = new ArrayList<>();
        expected.add(24);
        expected.add(41);
        expected.add(59);

        ArrayList<Integer> itinDist = itinerary2.getDistances();

        if(itinDist.size() == expected.size() && itinDist.size() == distances.size()) {
//        if(distances.size() == expected.size()){
            for (int i = 0; i < distances.size(); ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected.get(i), distances.get(i));
                assertEquals("Expect Objects to have the same information", itinDist.get(i), distances.get(i));
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

        TIPItinerary itinerary = new TIPItinerary(options, places, distances);
//        TIPItinerary itinerary = new TIPItinerary(3, options, places);
        itinerary.buildResponse();
        ArrayList<Integer> expected = new ArrayList<>();
        expected.add(0);

        ArrayList<Integer> itinDist = itinerary.getDistances();

        if(itinDist.size() == expected.size()) {
            for (int i = 0; i < itinDist.size(); ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected.get(i), itinDist.get(i));
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

        TIPItinerary itinerary = new TIPItinerary(options, places, distances);
//        TIPItinerary itinerary = new TIPItinerary(options, places);
        itinerary.buildResponse();
        ArrayList<Integer> expected = new ArrayList<>();

        ArrayList<Integer> itinDist = itinerary.getDistances();

        if(itinDist.size() == expected.size()) {
            for (int i = 0; i < itinDist.size(); ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected.get(i), itinDist.get(i));
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

        TIPItinerary itinerary = new TIPItinerary(options, places, distances);
//        TIPItinerary itinerary = new TIPItinerary(options, places);
        itinerary.buildResponse();
        ArrayList<Integer> expected = new ArrayList<>();
        expected.add(39);
        expected.add(65);
        expected.add(94);

//        ArrayList<Integer> itinDist = itinerary.getDistances();

        if(distances.size() == expected.size()) {
            for (int i = 0; i < distances.size(); ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected.get(i), distances.get(i));
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

        TIPItinerary itinerary = new TIPItinerary(options, places, distances);
//        TIPItinerary itinerary = new TIPItinerary(options, places);
        itinerary.buildResponse();
        ArrayList<Integer> expected = new ArrayList<>();
        expected.add(21);
        expected.add(35);
        expected.add(51);

//        ArrayList<Integer> itinDist = itinerary.getDistances();

        if(distances.size() == expected.size()) {
            for (int i = 0; i < distances.size(); ++i) {
                assertEquals("Expected distances are the same as the ItineraryObject", expected.get(i), distances.get(i));
            }
        } else {
            fail("Test with Nautical Miles failed");
        }

    }

    @Test
    public void testNearestNeighbor() {
        //NOTE: This test changes the places JsonArray!

        //fill options object
        options.addProperty("title", "My Trip");
        options.addProperty("earthRadius", 3440.069530);

        //fill places array with jsonobjects
        JsonObject denver = this.fillDenver();
        JsonObject boulder = this.fillBoulder();
        JsonObject foco = this.fillFoco();

        places.add(denver);
        places.add(foco);
        places.add(boulder);

        TIPItinerary itinerary = new TIPItinerary(options, places, distances);
        places = itinerary.nearestNeighbor(places);

        assertEquals("first location is denver", places.get(0), denver);
        assertEquals("second location is boulder", places.get(1), boulder);
        assertEquals("third location is foco", places.get(2), foco);
    }

}
