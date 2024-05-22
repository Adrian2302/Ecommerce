package com.tericcabrel.authapi.dtos;

import com.tericcabrel.authapi.entities.Wishlist;
import com.tericcabrel.authapi.entities.WishlistItem;

import java.util.List;

public class WishlistDto {
    private Long id;
    private UserDto user;
    private List<WishlistItem> items;

    public WishlistDto(Long id, UserDto user, List<WishlistItem> items) {
        this.id = id;
        this.user = user;
        this.items = items;
    }

    public WishlistDto(Wishlist wishlist){
        this.id = wishlist.getId();
        this.user = new UserDto(wishlist.getUser());
        this.items = wishlist.getItems();
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

    public List<WishlistItem> getItems() {
        return items;
    }

    public void setItems(List<WishlistItem> items) {
        this.items = items;
    }
}

