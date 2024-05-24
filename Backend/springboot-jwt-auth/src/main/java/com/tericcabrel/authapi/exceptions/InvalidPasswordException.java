package com.tericcabrel.authapi.exceptions;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException() {
        super("Invalid password.");
    }
}
