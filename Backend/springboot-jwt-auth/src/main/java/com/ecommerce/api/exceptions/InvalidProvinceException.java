package com.ecommerce.api.exceptions;

public class InvalidProvinceException extends RuntimeException {
    public InvalidProvinceException() {
        super("Invalid province.");
    }
}
