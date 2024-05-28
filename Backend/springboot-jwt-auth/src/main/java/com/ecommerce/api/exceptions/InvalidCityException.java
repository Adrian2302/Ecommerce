package com.ecommerce.api.exceptions;

public class InvalidCityException extends RuntimeException {
    public InvalidCityException() {
        super("Invalid city.");
    }
}
