package com.ecommerce.api.exceptions;

public class NoSizeSelectedException extends RuntimeException {
    public NoSizeSelectedException() {
        super("No size selected.");
    }
}
