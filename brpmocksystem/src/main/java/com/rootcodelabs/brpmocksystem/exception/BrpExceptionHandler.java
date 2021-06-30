package com.rootcodelabs.brpmocksystem.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.logging.Logger;

/**
 * The exception handler class.
 */
@ControllerAdvice
public class BrpExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger logger = Logger.getLogger(BrpExceptionHandler.class.getName());

    @ExceptionHandler(value = CustomUnauthorizedException.class)
    public ResponseEntity<Object> resourceNotFoundException(CustomUnauthorizedException exception) {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = CustomForbiddenException.class)
    public ResponseEntity<Object> messageNotFoundException(CustomForbiddenException exception) {
        return new ResponseEntity<>(exception.getMessage(),HttpStatus.FORBIDDEN);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}

