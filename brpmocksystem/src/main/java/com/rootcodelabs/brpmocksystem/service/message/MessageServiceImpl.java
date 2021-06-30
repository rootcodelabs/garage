package com.rootcodelabs.brpmocksystem.service.message;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import com.rootcodelabs.brpmocksystem.exception.CustomForbiddenException;
import com.rootcodelabs.brpmocksystem.parser.JsonParserClient;
import com.rootcodelabs.brpmocksystem.repository.MockJsonRepository;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class MessageServiceImpl implements  MessageService{

    private static final Logger LOGGER = Logger.getLogger(MessageServiceImpl.class.getName());

    @Autowired
    MockJsonRepository mockJsonRepository;

    @Autowired
    JsonParserClient jsonParserClient;

    @Override
    public JSONArray getMessageJsonArr(String messageId, Integer businessUnit) throws Exception {

        if ( businessUnit == null || businessUnit == 7) {
            List<MockJson> jsonEntity = mockJsonRepository.findById(messageId);
            JSONArray obj = null;
            if (jsonEntity.size() == 0) {
                List<MockJson> jsonErrorEntity = mockJsonRepository.findById("errorformessagetype");
                throw new CustomForbiddenException(jsonErrorEntity.get(0).getPayload());
            }
            for (MockJson entity : jsonEntity) {
                obj = jsonParserClient.getJsonArray(entity.getPayload());
            }
            return obj;
        } else {
            List<MockJson> jsonErrorEntity = mockJsonRepository.findById("errorforbusinessunit");
            throw new CustomForbiddenException(jsonErrorEntity.get(0).getPayload());
        }
    }
}
