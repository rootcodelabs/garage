package com.rootcodelabs.brpmocksystem.service.common;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import com.rootcodelabs.brpmocksystem.parser.JsonParserClient;
import com.rootcodelabs.brpmocksystem.repository.MockJsonRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

/**
 * This class has implementation to get json array , abject and to update json array.
 * And this class is used when there is not any need to rearrange the object array
 * or throw custom exceptions.
 */

@Service
public class MockSystemServiceImpl implements MockSystemService {

    private static final Logger LOGGER = Logger.getLogger(MockSystemServiceImpl.class.getName());

    @Autowired
    MockJsonRepository mockJsonRepository;

    @Autowired
    JsonParserClient jsonParserClient;

    @Override
    public JSONArray getJsonArr(String id) throws Exception {
        List<MockJson> jsonEntity = mockJsonRepository.findById(id);

        if(jsonEntity.size() == 0){
            return new JSONArray();
        }

        JSONArray arr = null;

            for(MockJson entity:jsonEntity) {
                arr = jsonParserClient.getJsonArray(entity.getPayload());
            }

        return arr;
    }

    @Override
    public JSONObject getJsonObj(String id) throws Exception {
        List<MockJson> jsonEntity = mockJsonRepository.findById(id);
        JSONObject obj = null;

        for(MockJson entity:jsonEntity) {
            obj = jsonParserClient.getJsonObject(entity.getPayload());

        }

        return obj;
    }

    @Override
    public void updateJsonArr(String id,String stringToUpdate) throws Exception {
        List<MockJson> jsonEntity = mockJsonRepository.findById(id);
        MockJson mockJson = new MockJson();
        JSONArray arr = null;

        for(MockJson entity:jsonEntity) {
            arr = jsonParserClient.getJsonArray(entity.getPayload());
            mockJson.setId(entity.getId());
        }

        for (int i = 0 ; i < arr.size(); i++) {
            JSONObject obj = (JSONObject)arr.get(i);
           obj.remove(stringToUpdate);
        }
        mockJson.setPayload(arr.toJSONString());
        mockJsonRepository.save(mockJson);
    }
}
