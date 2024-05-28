package com.ecommerce.api.exceptions;

public class InvalidCreditCardException extends RuntimeException {
    public InvalidCreditCardException() {
        super("Invalid credit card.");
    }
}
