package com.tericcabrel.authapi.dtos;

import com.tericcabrel.authapi.entities.ShoppingCart;
import com.tericcabrel.authapi.entities.ShoppingCartItem;

import java.util.List;

public class ShoppingCartDto {
    private Long id;
    private UserDto user;
    private List<ShoppingCartItem> items;

    public ShoppingCartDto(Long id, UserDto user, List<ShoppingCartItem> items) {
        this.id = id;
        this.user = user;
        this.items = items;
    }

    public ShoppingCartDto(ShoppingCart shoppingCart){
        this.id = shoppingCart.getId();
        this.user = new UserDto(shoppingCart.getUser());
        this.items = shoppingCart.getItems();
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

    public List<ShoppingCartItem> getItems() {
        return items;
    }

    public void setItems(List<ShoppingCartItem> items) {
        this.items = items;
    }
}

