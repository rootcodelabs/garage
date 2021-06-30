package com.rootcodelabs.brpmocksystem.service.login;

import org.json.simple.JSONObject;

/**
 * This interface has method signature to retrieve json object for login.
 */
public interface LoginService {

    /**
     *
     * @param customerId Json payload id for customer.
     * @return Json object.
     * @throws Exception
     */
    public JSONObject getJsonObjForLogin(String customerId) throws Exception;
}
