package com.rootcodelabs.brpmocksystem.controller;

import com.rootcodelabs.brpmocksystem.model.booking.GrpActivityBooking;
import com.rootcodelabs.brpmocksystem.service.booking.BookingService;
import com.rootcodelabs.brpmocksystem.service.common.MockSystemService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.logging.Logger;

/**
 * The controller for booking activities.
 */
@RestController
@Validated
public class BookingController {

    private static final Logger logger = Logger.getLogger(BookingController.class.getName());

    @Autowired
    BookingService bookingService;

    @GetMapping("customers/{customerId}/bookings/groupactivities")
    public ResponseEntity<JSONArray> listGroupActivitiesByCustomer(@PathVariable int customerId, @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("List group actitvity api is running:");
        return ResponseEntity.ok(bookingService.getJsonArrForBooking(customerId));
    }
}
