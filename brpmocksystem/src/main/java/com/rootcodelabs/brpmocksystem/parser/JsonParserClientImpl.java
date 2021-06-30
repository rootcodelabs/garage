package com.rootcodelabs.brpmocksystem.parser;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

/**
 * This class has implementations to parse string to json array and object.
 */
@Component
public class JsonParserClientImpl implements JsonParserClient{
    @Override
    public JSONObject getJsonObject(String strToParse) throws ParseException {
        JSONObject obj = new JSONObject();
        JSONParser jsonParser = new JSONParser();
        obj = (JSONObject)jsonParser.parse(strToParse);
        return obj;
    }

    @Override
    public JSONArray getJsonArray(String strToParse) throws ParseException {
        JSONArray obj = new JSONArray();
        JSONParser jsonParser = new JSONParser();
        obj = (JSONArray)jsonParser.parse(strToParse);
        return obj;
    }
}
