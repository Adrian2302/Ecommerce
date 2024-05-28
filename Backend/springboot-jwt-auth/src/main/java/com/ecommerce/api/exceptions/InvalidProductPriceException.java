package com.ecommerce.api.exceptions;

public class InvalidProductPriceException extends RuntimeException {
    public InvalidProductPriceException() {
        super("Invalid product price.");
    }
}
