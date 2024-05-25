package com.ecommerce.api.dtos;

import com.ecommerce.api.entities.*;

import java.util.Date;
import java.util.List;

public class UserDto {
    private Integer id;
    private String fullName;
    private String email;
    private String password;
    private Date createdAt;
    private Date updatedAt;
    private Role role;
//    private List<Orders> orders;
    private ShoppingCart shoppingCart;
    private Wishlist wishlist;
    private List<Orders> orders;

    public UserDto(Integer id, String fullName, String email, String password, Date createdAt, Date updatedAt, ShoppingCart shoppingCart, Wishlist wishlist, Role role) { //List<Orders> orders
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.role = role;
//        this.orders = orders;
        this.shoppingCart = shoppingCart;
        this.wishlist = wishlist;
    }

    public UserDto(User user){
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
        this.orders = user.getOrders();
        this.shoppingCart = user.getShoppingCart(); //this.shoppingCart = new ShoppingCartDto(user.getShoppingCart());
        this.wishlist = user.getWishlist(); //this.wishlist = new WishlistDto(user.getWishlist());
    }

    public List<Orders> getOrders() {
        return orders;
    }

    public void setOrders(List<Orders> orders) {
        this.orders = orders;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

//    public List<Orders> getOrders() {
//        return orders;
//    }
//
//    public void setOrders(List<Orders> orders) {
//        this.orders = orders;
//    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public Wishlist getWishlist() {
        return wishlist;
    }

    public void setWishlist(Wishlist wishlist) {
        this.wishlist = wishlist;
    }
}

