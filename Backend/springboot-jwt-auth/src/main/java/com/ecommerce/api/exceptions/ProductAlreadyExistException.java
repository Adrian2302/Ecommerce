package com.ecommerce.api.exceptions;

public class ProductAlreadyExistException extends RuntimeException {
    public ProductAlreadyExistException() {
        super("Product name already exists.");
    }
}
