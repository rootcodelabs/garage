package com.rootcodelabs.brpmocksystem.controller;

import com.rootcodelabs.brpmocksystem.service.common.MockSystemService;
import com.rootcodelabs.brpmocksystem.service.orders.OrdersService;
import com.rootcodelabs.brpmocksystem.service.valuecard.ValueCardService;
import com.sun.org.apache.xpath.internal.operations.Or;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
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

    @Autowired
    OrdersService ordersService;

    @Autowired
    ValueCardService valueCardService;

    @GetMapping("/products/groupactivities")
    public ResponseEntity<JSONArray> getGroupActivities(@RequestParam(required = false) Integer webCategory) throws Exception {
        return ResponseEntity.ok(mockSystemService.getJsonArr((webCategory!=null) ? webCategory.toString() + "listgrpactivities" : productActivitiesId));
    }

    @GetMapping("/products/groupactivities/{productId}")
    public ResponseEntity<JSONObject> getGroupActivitiesByProduct(@PathVariable int productId) throws Exception {
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
    public ResponseEntity<JSONArray> getPaymentMethod(@PathVariable int businessUnitId , @RequestParam int order) throws Exception {
        logger.info("get payment method api is running");
        return ResponseEntity.ok(mockSystemService.getJsonArr(businessUnitId+String.valueOf(order)+"paymentmethods"));
    }

    @PostMapping("/orders")
    public ResponseEntity<JSONObject> orders(@RequestParam Integer businessUnit, @RequestParam Integer customer, @RequestParam Integer customerType, @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("post orders api is running:");
        return ResponseEntity.ok(ordersService.getOrdersJsonObj(businessUnit+String.valueOf(customer)+String.valueOf(customerType)+"orders"));
    }

    @PostMapping("/orders/{orderId}/items/subscriptions")
    public ResponseEntity<JSONObject> createOrderforSubscriptions(@PathVariable int orderId, @RequestParam int subscriptionProduct, @RequestParam String birthDate, @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("create orders for subscription api is running:");
       // SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        //sdf1.setTimeZone(TimeZone.getTimeZone("GMT"));
       // Date date = sdf.parse(birthDate.toString());
        logger.info(orderId+String.valueOf(subscriptionProduct)+birthDate+"createOrders");
        return ResponseEntity.ok(ordersService.getOrdersJsonObj(orderId+String.valueOf(subscriptionProduct)+birthDate+"createOrders"));
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<JSONObject> getOrders(@PathVariable int orderId) throws Exception {
        logger.info("get orders api is running:");
        return ResponseEntity.ok(ordersService.getOrdersJsonObj(orderId+"orders"));
    }

    @GetMapping("/orders/{orderId}/valuecardreservations")
    public ResponseEntity<JSONArray> getValueCardReservations(@PathVariable int orderId) throws Exception {
        logger.info("get orders api is running:");
        return ResponseEntity.ok(mockSystemService.getJsonArr(orderId+"valuecardreservations"));
    }

    @GetMapping("/consents/{consentId}")
    public ResponseEntity<JSONArray> getConsentForBusinessUnit(@PathVariable int consentId, @RequestParam int businessUnit) throws Exception {
        logger.info("get consent for business unit api is running:");
        return ResponseEntity.ok(mockSystemService.getJsonArr(consentId+String.valueOf(businessUnit)+"consentforbunit"));
    }

    @PostMapping("/orders/{orderId}/valuecardreservations")
    public ResponseEntity<JSONArray> reserveValueCard(@PathVariable int orderId, @RequestBody JSONObject jsonObject, @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("reserve value card api is running:");
        logger.info("------------jsonObject---------------"+jsonObject.get("valueCardNumber"));
        return ResponseEntity.ok(valueCardService.getValueCardJsonArr(orderId+jsonObject.get("valueCardNumber").toString()+"valuecardreservations"));
    }

    @PostMapping("/orders/{orderId}/coupons")
    public ResponseEntity<JSONArray> couponCode(@PathVariable int orderId, @RequestBody JSONObject jsonObject, @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("coupon code api is running:");
        logger.info("------------jsonObject---------------"+jsonObject.get("couponName"));
        return ResponseEntity.ok(valueCardService.getValueCardJsonArr(orderId+jsonObject.get("couponName").toString()+"couponName"));
    }

    @PostMapping("/orders/{orderId}/items/valuecards")
    public ResponseEntity<JSONObject> addValueCard(@PathVariable int orderId, @RequestParam int valueCardProduct, @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("add value card api is running:");
        return ResponseEntity.ok(ordersService.getOrdersJsonObj(orderId+String.valueOf(valueCardProduct)+"valueCardProduct"));
    }

    @PostMapping("/orders/{orderId}/items/articles")
    public ResponseEntity<JSONObject> addArticle(@PathVariable int orderId, @RequestParam int articleProduct, @RequestParam int quantity, @RequestHeader("Authorization") String jwt) throws Exception {
        logger.info("add article api is running:");
        return ResponseEntity.ok(ordersService.getOrdersJsonObj(orderId+String.valueOf(articleProduct)+"articleProduct"));
    }

}
