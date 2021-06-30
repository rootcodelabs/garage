package com.rootcodelabs.brpmocksystem.service.brpworld;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import com.rootcodelabs.brpmocksystem.parser.JsonParserClient;
import com.rootcodelabs.brpmocksystem.repository.MockJsonRepository;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

/**
 * This class has implementations to retrieve json array for app code request.
 */

@Service
public class BrpWorldServiceImpl implements  BrpWorldService{

    private static final Logger LOGGER = Logger.getLogger(BrpWorldServiceImpl.class.getName());

    @Autowired
    MockJsonRepository mockJsonRepository;

    @Autowired
    JsonParserClient jsonParserClient;

    @Override
    public JSONArray getAppCodeJsonArr(String appCode) throws Exception {
        List<MockJson> jsonEntity = mockJsonRepository.findById(appCode);
        JSONArray obj = null;

        if(jsonEntity.size() == 0){
            return new JSONArray();
        }

        for(MockJson entity:jsonEntity) {
            obj = jsonParserClient.getJsonArray(entity.getPayload());
        }
        return obj;
    }
}
