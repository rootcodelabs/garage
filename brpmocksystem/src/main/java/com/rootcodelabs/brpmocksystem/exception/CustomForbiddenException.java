package com.rootcodelabs.brpmocksystem.exception;

/**
 * This is the exception class to throw forbidden exception for arbitrary situations.
 */
public class CustomForbiddenException extends RuntimeException{

    public CustomForbiddenException(String message) {
        super(message);
    }
}