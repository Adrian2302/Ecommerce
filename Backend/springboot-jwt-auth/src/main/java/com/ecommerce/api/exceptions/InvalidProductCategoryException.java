package com.ecommerce.api.exceptions;

public class InvalidProductCategoryException extends RuntimeException {
    public InvalidProductCategoryException() {
        super("Invalid product category.");
    }
}
