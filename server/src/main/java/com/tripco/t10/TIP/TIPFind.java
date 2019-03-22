package com.tripco.t10.TIP;

import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

public class TIPFind extends TIPHeader{
    private final transient Logger log = LoggerFactory.getLogger(TIPFind.class);

    //TIP objects
    /*
        match is required value set by client to lookup similar strings in database
        limit is optional value set by client to choose how many to
     */
    private String match;
    private int limit = 0;
    private int found;
    //    private JsonArray places = new JsonArray();
    private List<JsonObject> places = new ArrayList<>();

    //Connection for Database
    private String myDriver = "com.mysql.jdbc.Driver";
    private String url;
    private String user="cs314-db";
    private String pass="eiK5liet1uej";

    public String getMatch() {
        return match;
    }

    public void setMatch(String match) {
        this.match = match;
    }

    public int getLimit() {
        return limit;
    }

    public int getFound() {
        return found;
    }

    public List<JsonObject> getPlaces() {
        return places;
    }

    //Constructors
    private TIPFind(){
        this.requestType = "find";
        this.requestVersion = 3;
    }

    TIPFind(String match, int limit){
        this();
        this.match = match;
        this.limit = limit;
    }

    TIPFind(String match){
        this();
        this.match = match;
    }

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

    private String setSearch(){
        String search = "";
        if(limit > 0){
            search = "select municipality, latitude, longitude from colorado where municipality like '%" + match + "%' limit " + limit;
        }
        else if(limit == 0){
            search = "select municipality, latitude, longitude from colorado where municipality like '%" + match + "%'";
        } else {
            //if negative value
            System.err.println("Limit must be an integer of zero or greater.");
        }
        return search;
    }

    //taken from https://github.com/csucs314s19/tripco/blob/master/guides/database/DatabaseGuide.md
    private void addInfo() {
        setDBConnection();
        String count = "select count(municipality) from colorado where municipality like '%" + match + "%'";
        String search = setSearch();
        try {
            Class.forName(myDriver);
            // connect to the database and query
            try {
                Connection conn = DriverManager.getConnection(url, user, pass);

                Statement stCount = conn.createStatement();
                Statement stQuery = conn.createStatement();
                ResultSet rsCount = stCount.executeQuery(count);
                ResultSet rsQuery = stQuery.executeQuery(search);

                setFound(rsCount);
                setPlaces(rsQuery);
            } catch (Exception e) {
                System.err.println("Exception, connection failure: " + e.getMessage());
            }
        } catch (Exception e) {
            System.err.println("Exception, driver failure: " + e.getMessage());
        }
    }

    private void setFound(ResultSet rsCount) throws SQLException{
        rsCount.next();
        found = rsCount.getInt(1);
    }

    private void setPlaces(ResultSet rsQuery) throws SQLException{
        while (rsQuery.next()) {
            JsonObject place = new JsonObject();
            String name = rsQuery.getString("municipality");
            String latitude = rsQuery.getString("latitude");
            String longitude = rsQuery.getString("longitude");

            place.addProperty("name", name);
            place.addProperty("latitude", latitude);
            place.addProperty("longitude", longitude);

            places.add(place);
        }
    }

    @Override
    public void buildResponse() {
        this.addInfo();
        found = getFound();
        places = getPlaces();
        log.trace("buildResponse -> {}", this);
    }
}