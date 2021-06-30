package com.rootcodelabs.brpmocksystem.service.common;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 * The interface has method signatures which can be used to obtain json array , json object and to update json array
 */
public interface MockSystemService {

    /**
     *
     * @param id Json payload id.
     * @return A json array
     * @throws Exception
     */
    public JSONArray getJsonArr(String id) throws Exception;

    /**
     *
     * @param id Json payload id.
     * @return A json object
     * @throws Exception
     */
    public JSONObject getJsonObj(String id) throws Exception;

    /**
     *
     * @param id Json payload id.
     * @param stringToUpdate String to be replaced.
     * @throws Exception
     */
    public void updateJsonArr(String id, String stringToUpdate) throws Exception;
}
