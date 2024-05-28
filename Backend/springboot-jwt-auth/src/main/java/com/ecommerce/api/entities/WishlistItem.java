package com.ecommerce.api.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ecommerce.api.dtos.WishlistItemDto;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class WishlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "wishlist_id")
    @JsonBackReference
    private Wishlist wishlist;
    private int quantity;
    private double price;
    private String size;

    public WishlistItem(){
    }

    public WishlistItem(WishlistItemDto wishlistItemDto){
        this.id = wishlistItemDto.getId();
        this.product = new Product(wishlistItemDto.getProduct());
        this.wishlist = new Wishlist(wishlistItemDto.getWishlist());
        this.quantity = wishlistItemDto.getQuantity();
        this.price = wishlistItemDto.getPrice();
        this.size = wishlistItemDto.getSize();
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

    public Wishlist getWishlist() {
        return wishlist;
    }

    public void setWishlist(Wishlist wishlist) {
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


