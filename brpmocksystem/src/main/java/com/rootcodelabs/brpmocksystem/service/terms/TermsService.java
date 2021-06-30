package com.rootcodelabs.brpmocksystem.service.terms;

import org.json.simple.JSONArray;

/**
 * This interface has method signatures to obtain json for Terms
 */
public interface TermsService {

    /**
     *
     * @param id Json payload id
     * @return A json array
     * @throws Exception
     */
    public JSONArray getTermsJsonArr(String id) throws Exception;
}
