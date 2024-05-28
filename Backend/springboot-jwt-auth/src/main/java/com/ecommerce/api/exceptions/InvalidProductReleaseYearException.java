package com.ecommerce.api.exceptions;

public class InvalidProductReleaseYearException extends RuntimeException {
    public InvalidProductReleaseYearException() {
        super("Invalid product release year.");
    }
}
