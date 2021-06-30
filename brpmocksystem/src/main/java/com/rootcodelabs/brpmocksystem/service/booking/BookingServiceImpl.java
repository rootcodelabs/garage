package com.rootcodelabs.brpmocksystem.service.booking;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import com.rootcodelabs.brpmocksystem.exception.CustomForbiddenException;
import com.rootcodelabs.brpmocksystem.parser.JsonParserClient;
import com.rootcodelabs.brpmocksystem.repository.MockJsonRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.logging.Logger;

/**
 * This class has implementation to retrieve json object for booking.
 */

@Service
public class BookingServiceImpl implements BookingService{

    private static final Logger logger = Logger.getLogger(BookingServiceImpl.class.getName());

    @Autowired
    MockJsonRepository mockJsonRepository;

    @Autowired
    JsonParserClient jsonParserClient;



    @Override
    public JSONArray getJsonArrForBooking(int customerId) throws Exception {
        logger.info("-----------"+customerId + "listbookingactivities");
        List<MockJson> jsonEntity = mockJsonRepository.findById(customerId + "listbookingactivities");
        JSONArray arr = null;
        JSONObject jsonObj = null;
        for(MockJson entity:jsonEntity) {
            arr = jsonParserClient.getJsonArray(entity.getPayload());
        }
        for (Object obj:arr){

            jsonObj = (JSONObject) obj;
            Object duration = jsonObj.get("duration");

            String startDateTimeFactor = duration.toString().substring(duration.toString().indexOf("start")+8,duration.toString().indexOf("end") -3);
            String startTimeFactor = startDateTimeFactor.toString().substring(startDateTimeFactor.indexOf("T")+1);
            String endDateTimeFactor = duration.toString().substring(duration.toString().indexOf("end")+6,duration.toString().length() -2);
            String endTimeFactor = endDateTimeFactor.toString().substring(endDateTimeFactor.indexOf("T")+1);

            LocalDate startDate = LocalDate.now().plusDays(Long.parseLong(startDateTimeFactor.substring(0,startDateTimeFactor.indexOf("T"))));
            LocalDate endDate = LocalDate.now().plusDays(Long.parseLong(endDateTimeFactor.substring(0,endDateTimeFactor.indexOf("T"))));

            JSONObject newJson = new JSONObject();
            newJson.put("start", startDate.toString()+"T"+startTimeFactor);
            newJson.put("end", endDate.toString()+"T"+endTimeFactor);
            jsonObj.put("duration", newJson);

            if(jsonObj.get("groupActivityBooking") != null && ((JSONObject)jsonObj.get("groupActivityBooking")).get("order") != null){
                Object order = ((JSONObject)jsonObj.get("groupActivityBooking")).get("order");
                JSONObject orderJson = (JSONObject) order;
                JSONObject groupActivityBookingJson = (JSONObject)jsonObj.get("groupActivityBooking");
                String lastModifiedTimeFactor = order.toString().substring(order.toString().indexOf("lastModified")+15,order.toString().length()-2);
                LocalDate lastModifiedDate = LocalDate.now().plusDays(Long.parseLong(lastModifiedTimeFactor.toString().substring(0,lastModifiedTimeFactor.toString().indexOf("T"))));
                orderJson.put("lastModified", lastModifiedDate.toString()+"T"+lastModifiedTimeFactor.toString().substring(lastModifiedTimeFactor.toString().indexOf("T")+1));
                groupActivityBookingJson.put("order",orderJson);
                jsonObj.put("groupActivityBooking",groupActivityBookingJson);
            }

        }
        return arr;
    }
}
