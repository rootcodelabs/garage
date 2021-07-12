package com.rootcodelabs.brpmocksystem.service.orders;

import org.json.simple.JSONObject;

/**
 * The interface has method signatures which can be used to obtain json object
 */
public interface OrdersService {

    /**
     *
     * @param id Json payload id.
     * @return A json object
     * @throws Exception
     */
    public JSONObject getOrdersJsonObj(String id) throws Exception;

    /**
     *
     * @param id Json payload id.
     * @return A json object
     * @throws Exception
     */
    public JSONObject getArticleJsonObj(String id, Integer quantity) throws Exception;
}
