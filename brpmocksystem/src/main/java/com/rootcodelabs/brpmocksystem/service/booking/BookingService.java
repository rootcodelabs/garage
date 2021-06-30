package com.rootcodelabs.brpmocksystem.service.booking;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 * This interface has method signature to retrieve json object for booking.
 */
public interface BookingService {

    /**
     *
     * @param groupId The group booking id.
     * @param customerId The customer id.
     * @return A json object
     * @throws Exception
     */

    public JSONArray getJsonArrForBooking(int customerId) throws Exception;
}
