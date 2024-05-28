package com.ecommerce.api.exceptions;

public class InvalidAddressException extends RuntimeException {
    public InvalidAddressException() {
        super("Invalid address.");
    }
}
