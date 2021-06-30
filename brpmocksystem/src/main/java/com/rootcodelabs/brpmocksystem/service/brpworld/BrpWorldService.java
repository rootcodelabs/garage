package com.rootcodelabs.brpmocksystem.service.brpworld;

import org.json.simple.JSONArray;

/**
 * This interface has method signature to retrieve json array for app code request.
 */
public interface BrpWorldService {

    /**
     *
     * @param appCode Json payload id for appCode.
     * @return A json array
     * @throws Exception
     */
    public JSONArray getAppCodeJsonArr(String appCode) throws Exception;
}
