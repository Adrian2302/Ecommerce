package com.ecommerce.api.exceptions;

public class InvalidCardHolderNameException extends RuntimeException {
    public InvalidCardHolderNameException() {
        super("Invalid card holder name.");
    }
}
