package com.tericcabrel.authapi.dtos;

import com.tericcabrel.authapi.entities.*;

import java.util.Date;
import java.util.List;

public class OrdersDto {
    private Long id;
    private UserDto user;
    private List<OrdersItem> items;
    private double price;
    private Date purchaseDate;
    private String address1;
    private String address2;
    private String city;
    private String province;
    private Long zipCode;
    private Long cardNumber;
    private String cardHolderName;
    private StatusEnum status;
    private String expirationDate;
    private Long cvv;

    public OrdersDto(Long id, UserDto user, List<OrdersItem> items, double price, Date purchaseDate, String address1, String address2, String city, String province, Long zipCode, Long cardNumber, String cardHolderName, StatusEnum status, String expirationDate) {
        this.id = id;
        this.user = user;
        this.items = items;
        this.price = price;
        this.purchaseDate = purchaseDate;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.province = province;
        this.zipCode = zipCode;
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.status = status;
        this.expirationDate = expirationDate;
    }

    public OrdersDto(Orders orders){
        this.id = orders.getId();
        this.user = new UserDto(orders.getUser());
        this.items = orders.getItems();
        this.price = orders.getPrice();
        this.purchaseDate = orders.getPurchaseDate();
        this.address1 = orders.getAddress1();
        this.address2 = orders.getAddress2();
        this.city = orders.getCity();
        this.province = orders.getProvince();
        this.zipCode = orders.getZipCode();
        this.cardNumber = orders.getCardNumber();
        this.cardHolderName = orders.getCardHolderName();
        this.status = orders.getStatus();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<OrdersItem> getItems() {
        return items;
    }

    public void setItems(List<OrdersItem> items) {
        this.items = items;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public Long getZipCode() {
        return zipCode;
    }

    public void setZipCode(Long zipCode) {
        this.zipCode = zipCode;
    }

    public Long getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(Long cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public StatusEnum getStatus() {
        return status;
    }

    public void setStatus(StatusEnum status) {
        this.status = status;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Long getCvv() {
        return cvv;
    }

    public void setCvv(Long cvv) {
        this.cvv = cvv;
    }
}

