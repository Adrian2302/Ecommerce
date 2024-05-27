package com.ecommerce.api.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ecommerce.api.dtos.OrdersDto;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.List;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER) // @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;
    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private List<OrdersItem> items;
    private double price;
    @CreationTimestamp
    @Column(updatable = false, name = "purchase_date")
    private Date purchaseDate;
    @Column(length = 65555)
    private String address1;
    @Column(length = 65555)
    private String address2;
    private String city;
//    @ManyToOne
//    @JoinColumn(name = "province_id", nullable = false)
    private String province;
    private Long zipCode;
    private Long cardNumber;
    private String cardHolderName;
    private StatusEnum status;

    public Orders(){
    }

    public Orders(OrdersDto ordersDto){
        this.id = ordersDto.getId();
        this.user = new User(ordersDto.getUser());
        this.items = ordersDto.getItems();
        this.price = ordersDto.getPrice();
        this.purchaseDate = ordersDto.getPurchaseDate();
        this.address1 = ordersDto.getAddress1();
        this.address2 = ordersDto.getAddress2();
        this.city = ordersDto.getCity();
        this.province = ordersDto.getProvince();
        this.zipCode = ordersDto.getZipCode();
        this.cardHolderName = ordersDto.getCardHolderName();
        this.cardNumber = ordersDto.getCardNumber();
        this.status = ordersDto.getStatus();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
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
}

