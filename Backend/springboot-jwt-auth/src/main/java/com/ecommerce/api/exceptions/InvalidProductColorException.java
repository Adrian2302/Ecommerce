package com.ecommerce.api.exceptions;

public class InvalidProductColorException extends RuntimeException {
    public InvalidProductColorException() {
        super("Invalid product color.");
    }
}
