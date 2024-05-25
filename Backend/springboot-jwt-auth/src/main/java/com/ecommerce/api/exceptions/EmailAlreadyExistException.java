package com.ecommerce.api.exceptions;

public class EmailAlreadyExistException extends RuntimeException {
    public EmailAlreadyExistException() {
        super("Email already exists.");
    }
}
