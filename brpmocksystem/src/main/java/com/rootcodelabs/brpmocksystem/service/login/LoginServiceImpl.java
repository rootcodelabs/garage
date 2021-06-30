package com.rootcodelabs.brpmocksystem.service.login;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import com.rootcodelabs.brpmocksystem.exception.CustomUnauthorizedException;
import com.rootcodelabs.brpmocksystem.parser.JsonParserClient;
import com.rootcodelabs.brpmocksystem.repository.MockJsonRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

/**
 * This class has implementation to retrieve json object for login user.
 */

@Service
public class LoginServiceImpl implements LoginService{

    private static final Logger LOGGER = Logger.getLogger(LoginServiceImpl.class.getName());

    @Autowired
    MockJsonRepository mockJsonRepository;

    @Autowired
    JsonParserClient jsonParserClient;

    @Override
    public JSONObject getJsonObjForLogin(String customerId) throws Exception {

        List<MockJson> jsonEntity = mockJsonRepository.findById(customerId);
        JSONObject obj = null;

        if(jsonEntity.size() == 0){
            throw new CustomUnauthorizedException("resource not found");
        }
        for(MockJson entity:jsonEntity) {
            obj = jsonParserClient.getJsonObject(entity.getPayload());
        }
        return obj;
    }
}
