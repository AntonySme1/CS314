package com.tripco.t10.TIP;

import com.tripco.t10.misc.GreatCircleDistance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

import static com.tripco.t10.misc.GreatCircleDistance.calculateGreatCircleDistance;


/** Defines the TIP distance object.
 *
 * For use with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to determine the distance.
 * The MicroServer constructs the response JSON from the object using GSON.
 *
 * For unit testing purposes,
 * An object is created using the constructor below with appropriate parameters.
 * The buildResponse method is called to determine the distance.
 * The getDistance method is called to obtain the distance value for comparisons.
 *
 */
public class TIPDistance extends TIPHeader {
  private Map origin;
  private Map destination;
  private Float earthRadius;
  private Integer distance;

  private final transient Logger log = LoggerFactory.getLogger(TIPDistance.class);


  TIPDistance(int version, Map origin, Map destination, float earthRadius) {
    this();
    this.requestVersion = version;
    this.origin = origin;
    this.destination = destination;
    this.earthRadius = earthRadius;
    this.distance = 0;
  }


  private TIPDistance() {
    this.requestType = "distance";
  }


  @Override
  public void buildResponse() {
    double originLatitude = Double.parseDouble(String.valueOf(this.origin.get("latitude")));
    double originLongitude = Double.parseDouble(String.valueOf(this.origin.get("longitude")));

    double destinationLatitude = Double.parseDouble(String.valueOf(this.destination.get("latitude")));
    double destinationLongitude = Double.parseDouble(String.valueOf(this.destination.get("longitude")));

    double earthRadius = Double.parseDouble(String.valueOf(this.earthRadius));

    this.distance = (int) Math.round (calculateGreatCircleDistance(originLatitude, originLongitude, destinationLatitude, destinationLongitude, earthRadius));

    //this.origin.g
    log.trace("buildResponse -> {}", this);
  }


  int getDistance() {
    return distance;
  }

  @Override
  public String toString() {
    return "TIPDistance{" +
            "origin=" + origin +
            ", destination=" + destination +
            ", distance=" + distance +
            '}';
  }
}
