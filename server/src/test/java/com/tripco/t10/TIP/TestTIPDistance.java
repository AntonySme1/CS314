package com.tripco.t10.TIP;

import org.junit.Before;
import org.junit.Test;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP distance class and its buildResponse method.
 */
public class TestTIPDistance {

  /* Radius and location values shared by test cases */
  private final BigDecimal radiusMiles = new BigDecimal("6371000000");
  private Map<String, Object> csu;
  private final int version = 1;

  @Before
  public void createLocationsForTestCases() {
    csu = new HashMap<>();
    csu.put("latitude", "40.576179");
    csu.put("longitude", "-105.080773");
    csu.put("name", "Oval, Colorado State University, Fort Collins, Colorado, USA");
  }

  @Test
  public void testOriginDestinationSame() {
    TIPDistance trip = new TIPDistance(version, csu, csu, radiusMiles);
    trip.buildResponse();
    BigInteger expect = new BigInteger("0");
    BigInteger actual = trip.getDistance();
    assertEquals("origin and destination are the same", expect, actual);
  }
}
