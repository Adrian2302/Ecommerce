package com.ecommerce.api.dtos;

import com.ecommerce.api.entities.WishlistItem;

public class WishlistItemDto {
    private Long id;
    private ProductDto product;
    private WishlistDto wishlist;
    private int quantity;
    private double price;
    private String size;

    public WishlistItemDto(Long id, ProductDto product, WishlistDto wishlist, int quantity, double price, String size) {
        this.id = id;
        this.product = product;
        this.wishlist = wishlist;
        this.quantity = quantity;
        this.price = price;
        this.size = size;
    }

    public WishlistItemDto(WishlistItem wishlistItem) {
        this.id = wishlistItem.getId();
        this.product = new ProductDto(wishlistItem.getProduct());
        this.wishlist = new WishlistDto(wishlistItem.getWishlist());
        this.quantity = wishlistItem.getQuantity();
        this.price = wishlistItem.getPrice();
        this.size = wishlistItem.getSize();
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

    public WishlistDto getWishlist() {
        return wishlist;
    }

    public void setWishlist(WishlistDto wishlist) {
        this.wishlist = wishlist;
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
