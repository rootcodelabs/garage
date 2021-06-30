package com.rootcodelabs.brpmocksystem.exception;

/**
 * This is the exception class to throw unauthorized exception for arbitrary situations.
 */
public class CustomUnauthorizedException extends RuntimeException {

    public CustomUnauthorizedException(String message) {
        super(message);
    }
}
