package com.ecommerce.api.exceptions;

public class InvalidProductDescriptionException extends RuntimeException {
    public InvalidProductDescriptionException() {
        super("Invalid product description.");
    }
}
