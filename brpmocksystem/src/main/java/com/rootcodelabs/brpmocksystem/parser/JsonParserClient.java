package com.rootcodelabs.brpmocksystem.parser;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

/**
 * This interface has method signatures to parse a string to json object or json array.
 */
public interface JsonParserClient {

    /**
     *
     * @param strToParse String to parse to a json object.
     * @return A json object.
     * @throws ParseException
     */
    public JSONObject getJsonObject( String strToParse) throws ParseException;

    /**
     *
     * @param strToParse String to parse to a json array.
     * @return A json array.
     * @throws ParseException
     */
    public JSONArray getJsonArray(String strToParse) throws ParseException;
}
