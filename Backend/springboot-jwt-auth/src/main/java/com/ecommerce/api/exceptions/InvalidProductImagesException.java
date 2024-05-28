package com.ecommerce.api.exceptions;

public class InvalidProductImagesException extends RuntimeException {
    public InvalidProductImagesException() {
        super("Invalid product images.");
    }
}
