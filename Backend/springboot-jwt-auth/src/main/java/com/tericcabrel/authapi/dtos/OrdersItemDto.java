package com.tericcabrel.authapi.dtos;

import com.tericcabrel.authapi.entities.OrdersItem;
import com.tericcabrel.authapi.entities.ShoppingCartItem;

public class OrdersItemDto {
    private Long id;
    private OrdersDto orders;
    private String productName;
    private int quantity;
    private double price;
    private String size;

    public OrdersItemDto(Long id, OrdersDto orders, String productName, int quantity, double price, String size) {
        this.id = id;
        this.orders = orders;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.size = size;
    }

    public OrdersItemDto(OrdersItem ordersItem) {
        this.id = ordersItem.getId();
        this.orders = new OrdersDto(ordersItem.getOrders());
        this.productName = ordersItem.getProductName();
        this.quantity = ordersItem.getQuantity();
        this.price = ordersItem.getPrice();
        this.size = ordersItem.getSize();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrdersDto getOrders() {
        return orders;
    }

    public void setOrders(OrdersDto orders) {
        this.orders = orders;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
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
