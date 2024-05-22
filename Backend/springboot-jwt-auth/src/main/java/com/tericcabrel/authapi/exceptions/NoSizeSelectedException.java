package com.tericcabrel.authapi.exceptions;

public class NoSizeSelectedException extends RuntimeException {
    public NoSizeSelectedException() {
        super("No size selected.");
    }
}
