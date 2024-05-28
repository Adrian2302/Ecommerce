package com.ecommerce.api.exceptions;

public class InvalidProductBrandException extends RuntimeException {
    public InvalidProductBrandException() {
        super("Invalid product brand.");
    }
}
