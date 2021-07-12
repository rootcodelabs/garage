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

import java.time.LocalDate;
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
        List<MockJson> jsonEntityToUpdate = mockJsonRepository.findById(customerId + "listbookingactivities");

        JSONArray arrToUpdate = null;
        for(MockJson entity:jsonEntityToUpdate) {
            arrToUpdate = jsonParserClient.getJsonArray(entity.getPayload());
        }

        JSONObject obj = null;
        for(MockJson entity:jsonEntity) {
            obj = jsonParserClient.getJsonObject(entity.getPayload());
            arrToUpdate.add(obj);
        }

        MockJson mockJson = new MockJson();
        mockJson.setId(jsonEntityToUpdate.get(0).getId());
        mockJson.setPayload(arrToUpdate.toJSONString());
        mockJsonRepository.save(mockJson);

        Object duration = obj.get("duration");

        String startDateTimeFactor = duration.toString().substring(duration.toString().indexOf("start")+8,duration.toString().indexOf("end") -3);
        String startTimeFactor = startDateTimeFactor.toString().substring(startDateTimeFactor.indexOf("T")+1);
        String endDateTimeFactor = duration.toString().substring(duration.toString().indexOf("end")+6,duration.toString().length() -2);
        String endTimeFactor = endDateTimeFactor.toString().substring(endDateTimeFactor.indexOf("T")+1);

        LocalDate startDate = LocalDate.now().plusDays(Long.parseLong(startDateTimeFactor.substring(0,startDateTimeFactor.indexOf("T"))));
        LocalDate endDate = LocalDate.now().plusDays(Long.parseLong(endDateTimeFactor.substring(0,endDateTimeFactor.indexOf("T"))));

        JSONObject newJson = new JSONObject();
        newJson.put("start", startDate.toString()+"T"+startTimeFactor);
        newJson.put("end", endDate.toString()+"T"+endTimeFactor);
        obj.put("duration", newJson);
        return obj;
    }
}
