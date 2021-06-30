package com.rootcodelabs.brpmocksystem.service.customer;

import com.rootcodelabs.brpmocksystem.model.customer.TermsInfo;
import org.json.simple.JSONObject;

public interface CustomerService {

    public JSONObject updateCustomerJsonObj(String id, TermsInfo termsInfo) throws Exception;
    public JSONObject getJsonObjForBookingByCustomer(int groupId , int customerId) throws Exception;
}
