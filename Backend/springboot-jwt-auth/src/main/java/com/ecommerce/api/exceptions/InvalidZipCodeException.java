package com.ecommerce.api.exceptions;

public class InvalidZipCodeException extends RuntimeException {
    public InvalidZipCodeException() {
        super("Invalid zip code.");
    }
}
