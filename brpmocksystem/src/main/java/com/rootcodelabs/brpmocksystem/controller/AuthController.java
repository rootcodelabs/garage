package com.rootcodelabs.brpmocksystem.controller;

import com.rootcodelabs.brpmocksystem.model.customer.LoginInfo;
import com.rootcodelabs.brpmocksystem.service.login.LoginService;
import com.rootcodelabs.brpmocksystem.service.common.MockSystemService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.logging.Logger;

/**
 * The controller for auth login and auth validate.
 */
@RestController
@Validated
public class AuthController {

    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    @Value("${brp.login.user}")
    private String loginUser;

    @Value("${brp.validate.user}")
    private String validateUser;

    @Autowired
    MockSystemService mockSystemService;

    @Autowired
    LoginService loginService;

    @PostMapping("/auth/login")
    public ResponseEntity<JSONObject> getAccessKey(@Valid  @RequestBody JSONObject jsonObject) throws Exception{

         return ResponseEntity.ok(loginService.getJsonObjForLogin(jsonObject.get("username").toString()+jsonObject.get("password").toString()+"login"));

    }

    @PostMapping("/auth/validate")
    public ResponseEntity<JSONObject> validateKey(@Valid @RequestHeader("Authorization") String jwt) throws Exception{
        logger.info("Validate key api is running:");
        String withoutBearer = jwt.substring(jwt.indexOf("Bearer")+7);
        String payloadAndSignature = withoutBearer.substring(withoutBearer.indexOf(".")+1);
        String payload = payloadAndSignature.substring(0,payloadAndSignature.indexOf("."));
        return ResponseEntity.ok(mockSystemService.getJsonObj(payload+"validate"));
    }

    @GetMapping("/apps/{appId}")
    public ResponseEntity<JSONObject> getAppInfo(@PathVariable int appId) throws Exception {
        logger.info("Get app info api is running:");
        return ResponseEntity.ok(mockSystemService.getJsonObj(appId+"appInfo"));
    }
}
