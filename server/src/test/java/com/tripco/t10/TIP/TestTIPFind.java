package com.tripco.t10.TIP;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

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

    @Test
    public void testResponse() {
        match = "Sugar";
        limit = 0;

        TIPFind find = new TIPFind(match, limit);
        find.buildResponse();
        itemsExpected.add(makeObject("Sugar City", "38.45280075", "-103.5299988"));

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
        itemsExpected.add(makeObject("Sugar City", "38.45280075", "-103.5299988"));

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
        itemsExpected.add(makeObject("Fort Morgan", "40.2610917", "-103.7963389"));

        assertEquals("Expected number of items found", 15, find.getFound());
        assertEquals("Expected places to be found", itemsExpected, find.getPlaces());
        assertEquals("Expected match", "fort", find.getMatch());
        assertEquals("Expected limit", 1, find.getLimit());
    }

    @Test
    public void testWithDifferentLimit() {
        match = "fort";

        TIPFind find = new TIPFind(match, 5);
        find.buildResponse();
        itemsExpected.add(makeObject("Fort Morgan", "40.2610917", "-103.7963389"));
        itemsExpected.add(makeObject("Fort Collins", "40.5899009705", "-105.04599762"));
        itemsExpected.add(makeObject("Fort Collins", "40.5854988098", "-105.040000916"));
        itemsExpected.add(makeObject("Fort Collins", "40.58359909057617", "-106.98500061035156"));
        itemsExpected.add(makeObject("Fort Collins", "40.65829849243164", "-104.95099639892578"));

        assertEquals("Expected number of items found", 15, find.getFound());
        assertEquals("Expected places to be found", itemsExpected, find.getPlaces());
    }
}