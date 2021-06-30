package com.rootcodelabs.brpmocksystem.service.groupactivities;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.time.LocalTime;

public interface GroupActivityService {
    public JSONArray getGroupActivitiesJsonArrForTime(String id, LocalTime time) throws Exception;

    public JSONObject getGroupActivitiesJsonObj(String id) throws Exception;
}
