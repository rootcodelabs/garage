package com.rootcodelabs.brpmocksystem.service.valuecard;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public interface ValueCardService {
    /**
     *
     * @param id Json payload id.
     * @return A json array
     * @throws Exception
     */
    public JSONArray getValueCardJsonArr(String id) throws Exception;

    /**
     *
     * @param id Json payload id.
     * @return A json object
     * @throws Exception
     */
    public JSONObject getValueCardJsonObj(String id) throws Exception;
}
