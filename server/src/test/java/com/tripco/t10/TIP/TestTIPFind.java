package com.tripco.t10.TIP;

import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestTIPFind {
    public String match;
    public int limit;
    public ArrayList<JsonObject> itemsExpected;


    public JsonObject makeObject(String name, String latitude, String longitude){
        JsonObject item = new JsonObject();
        item.addProperty("name", name);
        item.addProperty("latitude", latitude);
        item.addProperty("longitude", longitude);
        return item;
    }

    @Before
    public void makeExpected(){
        itemsExpected = new ArrayList<>();
    }
    //Connection for Database
    private String myDriver = "com.mysql.jdbc.Driver";
    private String url;
    private String user="cs314-db";
    private String pass="eiK5liet1uej";

    private void setDBConnection(){
        String isTravis = System.getenv("TRAVIS");
        String isDevelopment = System.getenv("CS314_ENV");

        //running build on travis
        if(isTravis != null && isTravis.equals("true")) {
            url = "jdbc:mysql://127.0.0.1/cs314";
            user = "travis";
            pass = null;
        }
        //running on own machine and connecting through a tunnel
        else if(isDevelopment != null && isDevelopment.equals("development")){
            url = "jdbc:mysql://127.0.0.1:56247/cs314";
        }
        //running against production database directly (on campus)
        else {
            url = "jdbc:mysql://faure.cs.colostate.edu/cs314";
        }
    }


    @Test
    public void testResponse() {
        setDBConnection();
        match = "Sugar";
        limit = 0;

        TIPFind find = new TIPFind(match, limit);
        find.buildResponse();
        itemsExpected.add(makeObject("Sand Arroya Airport", "38.45280075", "-103.5299988"));

        assertEquals("Expected number of items found", 1, find.getFound());
        assertEquals("Expected places to be found", itemsExpected, find.getPlaces());
        assertEquals("Expected match", "Sugar", find.getMatch());
        assertEquals("Expected limit", 0, find.getLimit());
    }

    @Test
    public void testWithoutLimit() {
        setDBConnection();
        match = "Sugar";

        TIPFind find = new TIPFind(match);
        find.buildResponse();
        itemsExpected.add(makeObject("Sand Arroya Airport", "38.45280075", "-103.5299988"));

        assertEquals("Expected number of items found", 1, find.getFound());
        assertEquals("Expected places to be found", itemsExpected, find.getPlaces());
        assertEquals("Expected match", "Sugar", find.getMatch());
        assertEquals("Expected limit", 0, find.getLimit());
    }

    @Test
    public void testWithSpecificLimit() {
        setDBConnection();
        match = "fort";

        TIPFind find = new TIPFind(match, 1);
        find.buildResponse();
        itemsExpected.add(makeObject("Colorado Plains Medical Center Heliport", "40.2610917", "-103.7963389"));

        assertEquals("Expected number of items found", 17, find.getFound());
        assertEquals("Expected match", "fort", find.getMatch());
        assertEquals("Expected limit", 1, find.getLimit());
    }

    @Test
    public void testWithDifferentLimit() {
        setDBConnection();
        match = "fort";

        TIPFind find = new TIPFind(match, 3);
        find.buildResponse();
        itemsExpected.add(makeObject("Colorado Plains Medical Center Heliport", "40.2610917", "-103.7963389"));
        itemsExpected.add(makeObject("Geo-Seis Helicopters Heliport", "40.5899009705", "-105.04599762"));
        itemsExpected.add(makeObject("Century Helicopters Heliport", "40.5854988098", "-105.040000916"));

        assertEquals("Expected number of items found", 17, find.getFound());
        assertEquals("Expected places to be found", itemsExpected, find.getPlaces());
    }
}