package com.rootcodelabs.brpmocksystem.controller;

import com.rootcodelabs.brpmocksystem.service.common.MockSystemService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

/**
 * The controller for product tasks.
 */

@RestController
@Validated
public class ProductsController {

    private static final Logger logger = Logger.getLogger(ProductsController.class.getName());

    @Value("${brp.group.activities}")
    private String productActivitiesId;

//    @Value("${brp.web.categories}")
//    private String webCategoriesId;

    @Autowired
    MockSystemService mockSystemService;

    @GetMapping("/products/groupactivities")
    public ResponseEntity<JSONArray> getGroupActivities(@RequestParam(required = false) Integer webCategory) throws Exception {
        return ResponseEntity.ok(mockSystemService.getJsonArr((webCategory!=null) ? webCategory.toString() + "listgrpactivities" : productActivitiesId));
    }

    @GetMapping("/products/groupactivities/{productId}")
    public ResponseEntity<JSONObject> getGroupActivitiesByProduct(@PathVariable int productId, @RequestHeader("Authorization") String jwt) throws Exception {
        return ResponseEntity.ok(mockSystemService.getJsonObj(productId+"groupactivitybyproduct"));
    }

    @GetMapping("/webcategories/{webCategoriesId}")
    public ResponseEntity<JSONObject> getWebCategories(@PathVariable int webCategoriesId) throws Exception {
        return ResponseEntity.ok(mockSystemService.getJsonObj(String.valueOf(webCategoriesId)+"webcategory"));
    }

    @GetMapping("/webcategories")
    public ResponseEntity<JSONArray> getAllWebCategories() throws Exception {
        return ResponseEntity.ok(mockSystemService.getJsonArr("getallwebcategories"));
    }

    @GetMapping("/businessunits")
    public ResponseEntity<JSONArray> getAllBusinessUnits() throws Exception {
        return ResponseEntity.ok(mockSystemService.getJsonArr("allbusinessunits"));
    }

    @GetMapping("/products/subscriptions")
    public ResponseEntity<JSONArray> getSubscriptions(@RequestParam(required = false) Integer businessUnit, @RequestParam(required = false) Integer webCategory, @RequestParam(required = false) Integer customerType) throws Exception {
        logger.info("subscriptions api is running");
        if(businessUnit == null && webCategory == null && customerType == null) {
            return ResponseEntity.ok(mockSystemService.getJsonArr("allSubscriptions"));
        } else {
            return ResponseEntity.ok(mockSystemService.getJsonArr(businessUnit + String.valueOf(webCategory) + String.valueOf(customerType) + "subscriptions"));
        }
    }

    @GetMapping("/products/subscriptions/{subscriptionId}/additions")
    public ResponseEntity<JSONArray> getSubscriptionAdditions(@PathVariable int subscriptionId, @RequestParam(required = false) Integer customerType, @RequestParam(required = false) Integer customer) throws Exception {
        logger.info("subscription additions api is running"+customerType);
        if(customerType != null) {
            return ResponseEntity.ok(mockSystemService.getJsonArr(subscriptionId + String.valueOf(customerType) + "subscriptionAdditions"));
        } else if(customer != null){
            return ResponseEntity.ok(mockSystemService.getJsonArr(subscriptionId + String.valueOf(customer) + "subscriptionAdditions"));
        }
        return ResponseEntity.ok(new JSONArray());
    }

    @GetMapping("/consenttypes")
    public ResponseEntity<JSONArray> getConsentTypes(@RequestParam int businessUnit) throws Exception {
        logger.info("get consent types api is running"+businessUnit);
        return ResponseEntity.ok(mockSystemService.getJsonArr(businessUnit+"consenttypes"));
    }

    @GetMapping("/businessunits/{businessUnitId}/paymentmethods")
    public ResponseEntity<JSONArray> getPaymentMethod(@PathVariable int businessUnitId) throws Exception {
        return ResponseEntity.ok(mockSystemService.getJsonArr(businessUnitId+"paymentmethods"));
    }


}
