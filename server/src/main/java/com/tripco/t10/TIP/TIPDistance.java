package com.tripco.t10.TIP;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.math.BigInteger;
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
  private BigDecimal earthRadius;
  private BigInteger distance;

  private final transient Logger log = LoggerFactory.getLogger(TIPDistance.class);


  TIPDistance(int version, Map origin, Map destination, BigDecimal earthRadius) {
    this();
    this.requestVersion = version;
    this.origin = origin;
    this.destination = destination;
    this.earthRadius = earthRadius;
    this.distance = new BigInteger("0");
  }


  private TIPDistance() {
    this.requestType = "distance";
  }


  @Override
  public void buildResponse() {

    this.distance = calculateGreatCircleDistance(this.origin, this.destination, this.earthRadius);

    //this.origin.g
    log.trace("buildResponse -> {}", this);
  }


  BigInteger getDistance() {
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
