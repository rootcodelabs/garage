package com.rootcodelabs.brpmocksystem.controller;

import com.rootcodelabs.brpmocksystem.service.common.MockSystemService;
import com.rootcodelabs.brpmocksystem.service.terms.TermsService;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

/**
 * Controller for terms responses
 */
@RestController
public class TermsController {

    private static final Logger logger = Logger.getLogger(TermsController.class.getName());

    @Autowired
    TermsService termsService;

    @GetMapping("messages/noShowTerms")
    public ResponseEntity<JSONArray> getNoShowTerms(@RequestParam(required = true) Integer businessUnit) throws Exception {
        logger.info("------getNoShowTerms------"+businessUnit);
        return ResponseEntity.ok(termsService.getTermsJsonArr(businessUnit+"noShowTerms"));
    }

    @GetMapping("messages/waitingListTerms")
    public ResponseEntity<JSONArray> getWaitinListTerms(@RequestParam(required = true) Integer businessUnit) throws Exception {
        logger.info("------getWaitinListTerms------"+businessUnit);
        return ResponseEntity.ok(termsService.getTermsJsonArr(businessUnit+"waitingListTerms"));
    }

    @GetMapping("messages/bookingCancellationTerms")
    public ResponseEntity<JSONArray> getBookingCancellationTerms(@RequestParam(required = true) Integer businessUnit) throws Exception {
        logger.info("------getBookingCancellationTerms------"+businessUnit);
        return ResponseEntity.ok(termsService.getTermsJsonArr(businessUnit+"bookingCancellationTerms"));
    }

    @GetMapping("messages/bookingTerms")
    public ResponseEntity<JSONArray> getBookingTerms(@RequestParam(required = false) Integer businessUnit) throws Exception {
        logger.info("------getBookingTerms------"+businessUnit);
        return ResponseEntity.ok(termsService.getTermsJsonArr((businessUnit != null)?businessUnit+"bookingTerms":"allBookingTerms"));
    }

//    @GetMapping("messages/bookingTerms")
//    public ResponseEntity<JSONArray> getAllBookingTerms() throws Exception {
//        logger.info("------getAllBookingTerms------");
//        return ResponseEntity.ok(termsService.getTermsJsonArr("allBookingTerms"));
//    }

    @GetMapping("messages/appInfo")
    public ResponseEntity<JSONArray> getBusinessUnitAppInfo(@RequestParam(required = true) Integer businessUnit) throws Exception {
        logger.info("------getBusinessUnitAppInfo------"+businessUnit);
        return ResponseEntity.ok(termsService.getTermsJsonArr(businessUnit+"bUnitAppInfo"));
    }

    @GetMapping("messages/openingHours")
    public ResponseEntity<JSONArray> getOpeningHours(@RequestParam(required = true) Integer businessUnit) throws Exception {
        logger.info("------getOpeningHours------"+businessUnit);
        return ResponseEntity.ok(termsService.getTermsJsonArr(businessUnit+"openingHours"));
    }
}
