package com.rootcodelabs.brpmocksystem.service.orders;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import com.rootcodelabs.brpmocksystem.parser.JsonParserClient;
import com.rootcodelabs.brpmocksystem.repository.MockJsonRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.logging.Logger;

@Service
public class OrdersServiceImpl implements OrdersService{

    private static final Logger logger = Logger.getLogger(OrdersServiceImpl.class.getName());

    @Autowired
    MockJsonRepository mockJsonRepository;

    @Autowired
    JsonParserClient jsonParserClient;

    @Override
    public JSONObject getOrdersJsonObj(String id) throws Exception {
        List<MockJson> jsonEntity = mockJsonRepository.findById(id);
        JSONObject obj = null;

        for(MockJson entity:jsonEntity) {
            obj = jsonParserClient.getJsonObject(entity.getPayload());
            setTimeAndQuantity(obj, null);

        }

//        ZonedDateTime utc = ZonedDateTime.now(ZoneOffset.UTC);
//        obj.put("created",utc.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")).toString().replaceAll("...Z$","000Z"));
//        if (obj.get("lastModified") != null) {
//            obj.put("lastModified",utc.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")).toString().replaceAll("...Z$","000Z"));
//        }
//        if (obj.get("articleItems") != null) {
//            for(Object object:(JSONArray)obj.get("articleItems")){
//                ((JSONObject)object).put("quantity",1);
//            }
//        }
        return obj;
    }

    @Override
    public JSONObject getArticleJsonObj(String id, Integer quantity) throws Exception {
        List<MockJson> jsonEntity = mockJsonRepository.findById(id);
        JSONObject obj = null;

        for(MockJson entity:jsonEntity) {
            obj = jsonParserClient.getJsonObject(entity.getPayload());
            setTimeAndQuantity(obj, quantity);

        }
        return obj;
    }

    private void setTimeAndQuantity(JSONObject jsonObject, Integer quantity){
        ZonedDateTime utc = ZonedDateTime.now(ZoneOffset.UTC);
        jsonObject.put("created",utc.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")).toString().replaceAll("...Z$","000Z"));
        if (jsonObject.get("lastModified") != null) {
            jsonObject.put("lastModified",utc.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")).toString().replaceAll("...Z$","000Z"));
        }
        if (jsonObject.get("articleItems") != null && quantity != null) {
            for(Object object:(JSONArray)jsonObject.get("articleItems")){
                ((JSONObject)object).put("quantity",quantity);
            }
        }
    }
}
