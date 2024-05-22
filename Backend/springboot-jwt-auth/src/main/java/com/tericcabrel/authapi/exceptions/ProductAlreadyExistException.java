package com.tericcabrel.authapi.exceptions;

public class ProductAlreadyExistException extends RuntimeException {
    public ProductAlreadyExistException() {
        super("Product name already exists.");
    }
}
