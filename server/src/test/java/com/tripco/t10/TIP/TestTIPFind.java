package com.tripco.t10.TIP;

import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestTIPFind {
    public String match;
    public int limit;
    public ArrayList<JsonObject> itemsExpected;


    public JsonObject makeObject(String id, String name, String municipality, String latitude, String longitude){
        JsonObject item = new JsonObject();
        item.addProperty("id", id);
        item.addProperty("name", name);
        item.addProperty("municipality", municipality);
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

    @Test
    public void testResponse() {
        match = "Sugar";
        limit = 0;

        TIPFind find = new TIPFind(match, limit);
        find.buildResponse();
        itemsExpected.add(makeObject("US-0077", "Sand Arroya Airport", "Sugar City", "38.45280075", "-103.5299988"));

        assertEquals("Expected number of items found", 1, find.getFound());
        assertEquals("Expected places to be found", itemsExpected, find.getPlaces());
        assertEquals("Expected match", "Sugar", find.getMatch());
        assertEquals("Expected limit", 0, find.getLimit());
    }

    @Test
    public void testWithoutLimit() {
        match = "Sugar";

        TIPFind find = new TIPFind(match);
        find.buildResponse();
        itemsExpected.add(makeObject("US-0077", "Sand Arroya Airport", "Sugar City","38.45280075", "-103.5299988"));

        assertEquals("Expected number of items found", 1, find.getFound());
        assertEquals("Expected places to be found", itemsExpected, find.getPlaces());
        assertEquals("Expected match", "Sugar", find.getMatch());
        assertEquals("Expected limit", 0, find.getLimit());
    }

    @Test
    public void testWithSpecificLimit() {
        match = "fort";

        TIPFind find = new TIPFind(match, 1);
        find.buildResponse();
        itemsExpected.add(makeObject("0CD1", "Colorado Plains Medical Center Heliport", "Fort Morgan", "40.2610917", "-103.7963389"));

        assertEquals("Expected number of items found", 17, find.getFound());
        assertEquals("Expected match", "fort", find.getMatch());
        assertEquals("Expected limit", 1, find.getLimit());
    }

    @Test
    public void testWithDifferentLimit() {
        match = "fort";

        TIPFind find = new TIPFind(match, 3);
        find.buildResponse();
        itemsExpected.add(makeObject("0CD1" , "Colorado Plains Medical Center Heliport","Fort Morgan", "40.2610917", "-103.7963389"));
        itemsExpected.add(makeObject("0CO4", "Geo-Seis Helicopters Heliport", "Fort Collins", "40.5899009705", "-105.04599762"));
        itemsExpected.add(makeObject("0CO7", "Century Helicopters Heliport", "Fort Collins","40.5854988098", "-105.040000916"));

        assertEquals("Expected number of items found", 17, find.getFound());
        assertEquals("Expected places to be found", itemsExpected, find.getPlaces());
    }
}