package com.ecommerce.api.exceptions;

public class InvalidProductRetailPriceException extends RuntimeException {
    public InvalidProductRetailPriceException() {
        super("Invalid product retail price.");
    }
}
