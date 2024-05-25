package com.ecommerce.api.dtos;

import com.ecommerce.api.entities.ShoppingCartItem;

public class ShoppingCartItemDto {
    private Long id;
    private ProductDto product;
    private ShoppingCartDto shoppingCart;
    private int quantity;
    private double price;
    private String size;

    public ShoppingCartItemDto(Long id, ProductDto product, ShoppingCartDto shoppingCart, int quantity, double price, String size) {
        this.id = id;
        this.product = product;
        this.shoppingCart = shoppingCart;
        this.quantity = quantity;
        this.price = price;
        this.size = size;
    }

    public ShoppingCartItemDto(ShoppingCartItem shoppingCartItem) {
        this.id = shoppingCartItem.getId();
        this.product = new ProductDto(shoppingCartItem.getProduct());
        this.shoppingCart = new ShoppingCartDto(shoppingCartItem.getShoppingCart());
        this.quantity = shoppingCartItem.getQuantity();
        this.price = shoppingCartItem.getPrice();
        this.size = shoppingCartItem.getSize();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductDto getProduct() {
        return product;
    }

    public void setProduct(ProductDto product) {
        this.product = product;
    }

    public ShoppingCartDto getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCartDto shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}
