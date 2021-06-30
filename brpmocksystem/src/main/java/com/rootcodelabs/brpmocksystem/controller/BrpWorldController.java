package com.rootcodelabs.brpmocksystem.controller;

import com.rootcodelabs.brpmocksystem.service.brpworld.BrpWorldService;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

/**
 * The cotroller for BRP world.
 */
@RestController
@Validated
public class BrpWorldController {

    private static final Logger LOGGER = Logger.getLogger(BrpWorldController.class.getName());

    @Autowired
    BrpWorldService brpWorldService;

    @GetMapping("/apps")
    public ResponseEntity<JSONArray> getAppCode(@RequestParam int appCode) throws Exception {
        LOGGER.info("------getAppCode------"+appCode);
        return ResponseEntity.ok(brpWorldService.getAppCodeJsonArr(appCode+"appcode"));
    }
}
