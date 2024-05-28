package com.ecommerce.api.exceptions;

public class InvalidCvvException extends RuntimeException {
    public InvalidCvvException() {
        super("Invalid CVV.");
    }
}
