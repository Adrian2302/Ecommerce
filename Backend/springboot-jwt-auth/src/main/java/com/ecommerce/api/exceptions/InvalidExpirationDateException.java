package com.ecommerce.api.exceptions;

public class InvalidExpirationDateException extends RuntimeException {
    public InvalidExpirationDateException() {
        super("Invalid expiration date.");
    }
}
