package com.ecommerce.api.exceptions;

public class InvalidProductNameException extends RuntimeException {
    public InvalidProductNameException() {
        super("Invalid product name.");
    }
}
