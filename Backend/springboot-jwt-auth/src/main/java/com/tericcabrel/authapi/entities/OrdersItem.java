//package com.tericcabrel.authapi.entities;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.tericcabrel.authapi.dtos.OrdersItemDto;
//import com.tericcabrel.authapi.dtos.ShoppingCartItemDto;
//import jakarta.persistence.*;
//import org.hibernate.annotations.OnDelete;
//import org.hibernate.annotations.OnDeleteAction;
//
//@Entity
//public class OrdersItem {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
////    @ManyToOne(cascade = CascadeType.ALL)
////    @JoinColumn(name = "product_id", nullable = false)
////    @OnDelete(action = OnDeleteAction.CASCADE)
////    private Product product;
////    @ManyToOne //(cascade = CascadeType.REMOVE)
////    @JoinColumn(name = "product_id", nullable = false)
////    @OnDelete(action = OnDeleteAction.CASCADE)
////    private Product product;
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "orders_id")
//    @JsonBackReference
//    private Orders orders;
////    private Long productId;
//    private String productName;
//    private int quantity;
//    private double price;
//    private String size;
//
//    public OrdersItem(){
//    }
//
//    public OrdersItem(OrdersItemDto ordersItemDto){
//        this.id = ordersItemDto.getId();
//        this.orders = new Orders(ordersItemDto.getOrders());
//        this.productName = ordersItemDto.getProductName();
//        this.quantity = ordersItemDto.getQuantity();
//        this.price = ordersItemDto.getPrice();
//        this.size = ordersItemDto.getSize();
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Orders getOrders() {
//        return orders;
//    }
//
//    public void setOrders(Orders orders) {
//        this.orders = orders;
//    }
//
//    public String getProductName() {
//        return productName;
//    }
//
//    public void setProductName(String productName) {
//        this.productName = productName;
//    }
//
//    public int getQuantity() {
//        return quantity;
//    }
//
//    public void setQuantity(int quantity) {
//        this.quantity = quantity;
//    }
//
//    public double getPrice() {
//        return price;
//    }
//
//    public void setPrice(double price) {
//        this.price = price;
//    }
//
//    public String getSize() {
//        return size;
//    }
//
//    public void setSize(String size) {
//        this.size = size;
//    }
//}
//
//
