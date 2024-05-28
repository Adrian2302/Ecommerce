package com.ecommerce.api.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ecommerce.api.dtos.ShoppingCartItemDto;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class ShoppingCartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shopping_cart_id")
    @JsonBackReference
    private ShoppingCart shoppingCart;
    private int quantity;
    private double price;
    private String size;

    public ShoppingCartItem(){
    }

    public ShoppingCartItem(ShoppingCartItemDto shoppingCartItemDto){
        this.id = shoppingCartItemDto.getId();
        this.product = new Product(shoppingCartItemDto.getProduct());
        this.shoppingCart = new ShoppingCart(shoppingCartItemDto.getShoppingCart());
        this.quantity = shoppingCartItemDto.getQuantity();
        this.price = shoppingCartItemDto.getPrice();
        this.size = shoppingCartItemDto.getSize();
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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


