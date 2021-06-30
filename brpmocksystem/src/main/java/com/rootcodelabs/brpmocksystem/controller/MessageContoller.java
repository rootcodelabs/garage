package com.rootcodelabs.brpmocksystem.controller;

import com.rootcodelabs.brpmocksystem.service.message.MessageService;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

/**
 * The controller for message tasks.
 */
@RestController
@Validated
public class MessageContoller {

    private static final Logger logger = Logger.getLogger(MessageContoller.class.getName());

    @Autowired
    MessageService messageService;

    @GetMapping("messages/{messageId}")
    public ResponseEntity<JSONArray> getMessage(@PathVariable String messageId, @RequestParam(required = false) Integer businessUnit) throws Exception {
        logger.info("------getMessage------"+messageId);
        return ResponseEntity.ok(messageService.getMessageJsonArr(messageId, businessUnit));
    }
}
