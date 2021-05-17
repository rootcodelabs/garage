package com.rootcodelabs.keycloakclient.controller;

import com.rootcodelabs.keycloakclient.model.AuthInfo;
import com.rootcodelabs.keycloakclient.model.SignUpUserInfo;
import com.rootcodelabs.keycloakclient.model.LoginInfo;
import com.rootcodelabs.keycloakclient.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.logging.Logger;

@RestController
@Validated
public class ClientController {

    private static final Logger LOGGER = Logger.getLogger(ClientController.class.getName());

    @Autowired
    ClientService clientService;

    @PostMapping("/getKey")
    public ResponseEntity<AuthInfo> getAccessKey(@Valid @RequestBody LoginInfo loginInfo) throws Exception{

        LOGGER.info("getKey service is running-----");
        return clientService.getKeyCloakKey(loginInfo);
    }

    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@Valid @RequestBody SignUpUserInfo user) throws Exception{

        LOGGER.info("createUser service is running-----");
        return clientService.createUser(user);
    }
}
