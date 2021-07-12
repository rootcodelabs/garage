package com.rootcodelabs.brpmocksystem.service.groupactivities;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import com.rootcodelabs.brpmocksystem.parser.JsonParserClient;
import com.rootcodelabs.brpmocksystem.repository.MockJsonRepository;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.logging.Logger;

@Service
public class GroupActivitiesServiceImpl implements  GroupActivityService{

    private static final Logger logger = Logger.getLogger(GroupActivitiesServiceImpl.class.getName());

    @Autowired
    MockJsonRepository mockJsonRepository;

    @Autowired
    JsonParserClient jsonParserClient;

    @Override
    public JSONArray getGroupActivitiesJsonArrForTime(String id, LocalTime time) throws Exception {

        if(time == null){
            id=id+"listgrpactivities";
         } else if( time.compareTo(LocalTime.parse("06:00")) < 0){
            id=id+"5"+"listgrpactivities";
         } else if( time.compareTo(LocalTime.parse("07:00")) < 0  && time.compareTo(LocalTime.parse("06:00")) >= 0 ) {
            id=id+"6"+"listgrpactivities";
         } else if( time.compareTo(LocalTime.parse("08:00")) < 0 && time.compareTo(LocalTime.parse("07:00")) >= 0 ) {
            id=id+"7"+"listgrpactivities";
         } else if( time.compareTo(LocalTime.parse("09:00")) < 0 && time.compareTo(LocalTime.parse("08:00")) >= 0 ) {
            id=id+"8"+"listgrpactivities";
         } else if( time.compareTo(LocalTime.parse("10:00")) < 0 && time.compareTo(LocalTime.parse("09:00")) >= 0) {
            id=id+"9"+"listgrpactivities";
         } else if( time.compareTo(LocalTime.parse("11:00")) < 0  && time.compareTo(LocalTime.parse("10:00")) >= 0) {
            id=id+"10"+"listgrpactivities";
         } else if( time.compareTo(LocalTime.parse("12:00")) < 0  && time.compareTo(LocalTime.parse("11:00")) >= 0) {
            id=id+"11"+"listgrpactivities";
         } else if( time.compareTo(LocalTime.parse("13:00")) < 0  && time.compareTo(LocalTime.parse("12:00")) >= 0) {
            id=id+"12"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("14:00")) < 0  && time.compareTo(LocalTime.parse("13:00")) >= 0) {
            id=id+"13"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("15:00")) < 0  && time.compareTo(LocalTime.parse("14:00")) >= 0) {
            id=id+"14"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("16:00")) < 0  && time.compareTo(LocalTime.parse("15:00")) >= 0) {
            id=id+"15"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("17:00")) < 0  && time.compareTo(LocalTime.parse("16:00")) >= 0) {
            id=id+"16"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("18:00")) < 0  && time.compareTo(LocalTime.parse("17:00")) >= 0) {
            id=id+"17"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("19:00")) < 0  && time.compareTo(LocalTime.parse("18:00")) >= 0) {
            id=id+"18"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("20:00")) < 0  && time.compareTo(LocalTime.parse("19:00")) >= 0) {
            id=id+"19"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("21:00")) < 0  && time.compareTo(LocalTime.parse("20:00")) >= 0) {
            id=id+"20"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("22:00")) < 0  && time.compareTo(LocalTime.parse("21:00")) >= 0) {
            id=id+"21"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("23:00")) < 0  && time.compareTo(LocalTime.parse("22:00")) >= 0) {
            id=id+"22"+"listgrpactivities";
        } else if( time.compareTo(LocalTime.parse("00:00")) < 0  && time.compareTo(LocalTime.parse("23:00")) >= 0) {
            logger.info(id+"23"+"listgrpactivities");
            id=id+"23"+"listgrpactivities";
        }

        List<MockJson> jsonEntity = mockJsonRepository.findById(id);

        if(jsonEntity.size() == 0){
            return new JSONArray();
        }

        JSONArray arr = null;

        for(MockJson entity:jsonEntity) {
            arr = jsonParserClient.getJsonArray(entity.getPayload());
        }

        for (Object obj:arr){
            dateAdjuster((JSONObject) obj);
        }

        return arr;
    }

    @Override
    public JSONObject getGroupActivitiesJsonObj(String id) throws Exception {
        List<MockJson> jsonEntity = mockJsonRepository.findById(id);
        JSONObject obj = null;

        for(MockJson entity:jsonEntity) {
            obj = jsonParserClient.getJsonObject(entity.getPayload());
            dateAdjuster(obj);
        }
        return obj;
    }
    private void dateAdjuster(JSONObject jsonObj){

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

            if(jsonObj.get("bookableLatest") != null){
                Object bookableLatest = jsonObj.get("bookableLatest");
                LocalDate bookableLatestDate = LocalDate.now().plusDays(Long.parseLong(bookableLatest.toString().substring(0,bookableLatest.toString().indexOf("T"))));
                jsonObj.put("bookableLatest", bookableLatestDate.toString()+"T"+bookableLatest.toString().substring(bookableLatest.toString().indexOf("T")+1));
            }

            if (jsonObj.get("bookableEarliest") != null) {
                Object bookableEarliest = jsonObj.get("bookableEarliest");
                LocalDate bookableEarliestDate = LocalDate.now().plusDays(Long.parseLong(bookableEarliest.toString().substring(0,bookableEarliest.toString().indexOf("T"))));
                jsonObj.put("bookableEarliest", bookableEarliestDate.toString()+"T"+bookableEarliest.toString().substring(bookableEarliest.toString().indexOf("T")+1));
            }
    }
}
