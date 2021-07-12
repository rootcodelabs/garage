package com.rootcodelabs.brpmocksystem.controller;

import com.rootcodelabs.brpmocksystem.service.common.MockSystemService;
import com.rootcodelabs.brpmocksystem.service.groupactivities.GroupActivityService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.processing.SupportedOptions;
import java.time.LocalTime;
import java.util.Date;
import java.util.logging.Logger;

/**
 * The controller for group activities.
 */
@RestController
@Validated
public class GroupActivityController {

    private static final Logger logger = Logger.getLogger(GroupActivityController.class.getName());

    @Autowired
    MockSystemService mockSystemService;

    @Autowired
    GroupActivityService groupActivityService;

    @GetMapping("/businessunits/{selectedBusinessUnit}/groupactivities")
    public ResponseEntity<JSONArray> listGroupActivitiesByBusinessUnit(@PathVariable int selectedBusinessUnit , @RequestParam(value="period.start",required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") final Date start, @RequestParam(value="period.end",required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") final Date  end, @RequestParam(required = false) Integer webCategory) throws Exception {
        logger.info("List group actitvity api is running:");
        logger.info("selectedBusinessUnit"+selectedBusinessUnit);
        logger.info("webCategory"+webCategory);
        LocalTime startTime = LocalTime.parse("06:30");

        if (webCategory != null){
            return ResponseEntity.ok(groupActivityService.getGroupActivitiesJsonArrForTime(selectedBusinessUnit+webCategory.toString()
                    ,(start != null & end != null)?LocalTime.parse(start.toString().substring(start.toString().indexOf(":") -2,start.toString().indexOf(":")+3)):null));
        } else {
            return ResponseEntity.ok(groupActivityService.getGroupActivitiesJsonArrForTime(String.valueOf(selectedBusinessUnit)
                    ,(start != null & end != null)?LocalTime.parse(start.toString().substring(start.toString().indexOf(":") -2,start.toString().indexOf(":")+3)):null
                    ));
        }
    }

    @GetMapping("/businessunits/{selectedBusinessUnit}/groupactivities/{id}")
    public ResponseEntity<JSONObject> listGroupActivitiesByBusinessUnitAndId(@PathVariable int selectedBusinessUnit , @PathVariable int id) throws Exception {
        logger.info("List group actitvity by business unit and id api is running:");
        return ResponseEntity.ok(groupActivityService.getGroupActivitiesJsonObj(selectedBusinessUnit+ String.valueOf(id)+"listgrpactivities"));
    }



}
