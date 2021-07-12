package com.rootcodelabs.brpmocksystem.service.valuecard;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import com.rootcodelabs.brpmocksystem.exception.CustomForbiddenException;
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
public class ValueCardServiceImpl implements  ValueCardService{

    private static final Logger logger = Logger.getLogger(ValueCardServiceImpl.class.getName());

    @Autowired
    MockJsonRepository mockJsonRepository;

    @Autowired
    JsonParserClient jsonParserClient;

    @Override
    public JSONArray getValueCardJsonArr(String id) throws Exception {

        List<MockJson> jsonEntity = mockJsonRepository.findById(id);
        if (jsonEntity.size() == 0) {
            List<MockJson> jsonErrorEntity = mockJsonRepository.findById(id.contains("valuecard")?"valueCardNumberError":"couponError");
            throw new CustomForbiddenException(jsonErrorEntity.get(0).getPayload());
        }
        JSONArray arr = null;

        for(MockJson entity:jsonEntity) {
            arr = jsonParserClient.getJsonArray(entity.getPayload());
        }

        return arr;
    }

    @Override
    public JSONObject getValueCardJsonObj(String id) throws Exception {
        return null;
    }
}
