package com.tericcabrel.authapi.exceptions;

public class EmailAlreadyExistException extends RuntimeException {
    public EmailAlreadyExistException() {
        super("Email already exists.");
    }
}
