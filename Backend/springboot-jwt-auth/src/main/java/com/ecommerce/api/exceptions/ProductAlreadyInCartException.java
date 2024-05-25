package com.ecommerce.api.exceptions;

public class ProductAlreadyInCartException extends RuntimeException {
    public ProductAlreadyInCartException() {
        super("Product is already in the cart.");
    }
}
