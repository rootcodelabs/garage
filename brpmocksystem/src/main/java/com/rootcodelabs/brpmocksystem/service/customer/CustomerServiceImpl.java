package com.rootcodelabs.brpmocksystem.service.customer;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import com.rootcodelabs.brpmocksystem.exception.CustomForbiddenException;
import com.rootcodelabs.brpmocksystem.model.customer.TermsInfo;
import com.rootcodelabs.brpmocksystem.parser.JsonParserClient;
import com.rootcodelabs.brpmocksystem.repository.MockJsonRepository;
import com.rootcodelabs.brpmocksystem.service.common.MockSystemServiceImpl;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class CustomerServiceImpl implements CustomerService {

    private static final Logger LOGGER = Logger.getLogger(CustomerServiceImpl.class.getName());

    @Autowired
    MockJsonRepository mockJsonRepository;

    @Autowired
    JsonParserClient jsonParserClient;

    public static final int[] ERROR_GENERATING_ACTIVITIES = {181, 180, 29, 77};

    @Override
    public JSONObject updateCustomerJsonObj(String id, TermsInfo termsInfo) throws Exception {

        List<MockJson> jsonEntity = mockJsonRepository.findById(id);

        MockJson mockJson = new MockJson();
        JSONObject obj = null;

        obj = jsonParserClient.getJsonObject(jsonEntity.get(0).getPayload());
        obj.put("acceptedBookingTerms", termsInfo.isAcceptedBookingTerms());
        mockJson.setId(jsonEntity.get(0).getId());
        mockJson.setPayload(obj.toJSONString());

        mockJsonRepository.save(mockJson);

        return obj;
    }

    @Override
    public JSONObject getJsonObjForBookingByCustomer(int groupId, int customerId) throws Exception {
        for (int activity: ERROR_GENERATING_ACTIVITIES){
            if(activity == groupId) {

                List<MockJson> jsonErrorEntity = mockJsonRepository.findById(groupId + String.valueOf(customerId) + "grpactivitybookingerror");
                throw new CustomForbiddenException(jsonErrorEntity.get(0).getPayload());
            }
        }
        List<MockJson> jsonEntity = mockJsonRepository.findById(groupId + String.valueOf(customerId) + "grpactivitybooking");
        JSONObject obj = null;
        for(MockJson entity:jsonEntity) {
            obj = jsonParserClient.getJsonObject(entity.getPayload());
        }
        return obj;
    }
}
