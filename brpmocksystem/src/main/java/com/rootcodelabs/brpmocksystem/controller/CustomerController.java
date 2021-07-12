package com.rootcodelabs.brpmocksystem.controller;

import com.rootcodelabs.brpmocksystem.model.booking.GrpActivityBooking;
import com.rootcodelabs.brpmocksystem.model.customer.TermsInfo;
import com.rootcodelabs.brpmocksystem.service.common.MockSystemService;
import com.rootcodelabs.brpmocksystem.service.customer.CustomerService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.util.logging.Logger;

/**
 * The controller for customer tasks.
 */
@RestController
@Validated
public class CustomerController {

    private static final Logger logger = Logger.getLogger(CustomerController.class.getName());

    @Value("${brp.group.activities}")
    private String productActivitiesId;

    @Autowired
    MockSystemService mockSystemService;

    @Autowired
    CustomerService customerService;

    @GetMapping("/customers/{customerId}/workoutssummary")
    public ResponseEntity <JSONArray> getCustomerWorkoutSummary(@PathVariable int customerId , @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("Get customer workout summary api is running");
        return ResponseEntity.ok(mockSystemService.getJsonArr(customerId+"workoutsum"));
    }

    @GetMapping("/customers/{customerId}")
    public ResponseEntity <JSONObject> getCustomer(@PathVariable int customerId , @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("Get customer api is running");
        return ResponseEntity.ok(mockSystemService.getJsonObj(customerId+"customer"));
    }

    @PutMapping("/customers/{customerId}")
    public ResponseEntity <JSONObject> updateCustomer(@PathVariable int customerId, @RequestBody TermsInfo termsInfo, @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("Update customer api is running");
        return ResponseEntity.ok(customerService.updateCustomerJsonObj(customerId+"customer", termsInfo));
    }

    @PostMapping("customers/{customerId}/bookings/groupactivities")
    public ResponseEntity<JSONObject> bookGroupActivityByCustomer(@Valid @RequestBody GrpActivityBooking grpActivityBooking, @PathVariable int customerId, @RequestHeader("Authorization") String jwt) throws Exception{
        logger.info("Group activity booking api is running:");
        return ResponseEntity.ok(customerService.getJsonObjForBookingByCustomer(grpActivityBooking.getGroupActivity() ,customerId));
    }

    @GetMapping("/customers/{customerId}/bookings/services")
    public ResponseEntity <JSONArray> getCustomerBoookingServices(@PathVariable int customerId , @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("Get customer booking services api is running");
        return ResponseEntity.ok(mockSystemService.getJsonArr(customerId+"customerBookingServices"));
    }

    @GetMapping("/customertypes")
    public ResponseEntity <JSONArray> getAllCustomerTypes() throws Exception {
        logger.info("Get all customer types api is running");
        return ResponseEntity.ok(mockSystemService.getJsonArr("allCustomerTypes"));
    }

    @GetMapping("/customers/{customerId}/profileimages/{imageId}")
    public ResponseEntity <String> getCustomerProfileImage(@PathVariable int customerId , @PathVariable int imageId, @RequestParam String access_token) throws Exception {
        logger.info("Get customer  api is running");
        return ResponseEntity.ok("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");
    }

    //Read me file not updated
    @PutMapping("/services/validate/customers/{customerId}")
    public ResponseEntity  validateCustomer(@PathVariable int customerId, @RequestBody JSONObject object, @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("Validate customer api is running");
        return ResponseEntity.ok().build();
    }

    @GetMapping("/customers/{customerId}/consents/sedirectdebits")
    public ResponseEntity <JSONArray> seDirectDebits(@PathVariable int customerId , @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("Get direct debits api is running");
        return ResponseEntity.ok(mockSystemService.getJsonArr(customerId+"directDebits"));
    }

    //Read me file not updated
    @PostMapping("/customers/{customerId}/valuecards")
    public ResponseEntity  createCustomerValueCard(@PathVariable int customerId , @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("create customer value card api is running");
        return ResponseEntity.ok().build();
    }

    @GetMapping("/customers/{customerId}/valuecards")
    public ResponseEntity <JSONArray> getCustomerValueCard(@PathVariable int customerId , @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("Get customer value card api is running");
        return ResponseEntity.ok(mockSystemService.getJsonArr(customerId+"valuecard"));
    }

    @PostMapping("/services/generatelink/payment")
    public ResponseEntity <JSONObject> generateLink(@RequestBody JSONObject jsonObject) throws Exception {
        logger.info("generate link api is running");
        return ResponseEntity.ok(mockSystemService.getJsonObj(jsonObject.get("order").toString()+"generateLink"));
    }
   //Readme file not updated
    @GetMapping("/payment/klarna/payfororder")
    public RedirectView payForOrder(@RequestParam int orderid, @RequestParam String returnurl, @RequestParam int paymentmethodid, @RequestParam String hash) throws Exception {
        logger.info("pay for order api is running");
        return new RedirectView("/payment/klarna/checkout");
    }
    //Readme file not updated
    @GetMapping("/payment/klarna/checkout")
    @ResponseBody
    public ModelAndView checkout() throws Exception {
        logger.info("checkout api is running");
        return new ModelAndView("checkout");
    }
    //Readme file not updated
    @GetMapping("/paymentresult")
    public ModelAndView getPaymentResult(@RequestParam int orderid, @RequestParam boolean cancelled) throws Exception {
        logger.info("get payment result api is running");
        return new ModelAndView("paymentresults");
    }
}
