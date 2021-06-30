package com.rootcodelabs.brpmocksystem.service.message;

import org.json.simple.JSONArray;

public interface MessageService {
    public JSONArray getMessageJsonArr(String messageId , Integer businessUnit) throws Exception;
}
