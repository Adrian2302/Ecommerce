package com.ecommerce.api.entities;

import com.ecommerce.api.dtos.ProductDto;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String smallDescription;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> images;
    private String category;
    private String brand;
    private double retailPrice;
    private double price;
    private int recentlySold;
    private String color;
    private int releaseYear;
    @Column(length = 65555)
    private String fullDescription;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> sizes;
//    @OneToMany(cascade = CascadeType.ALL)
//    private List<WishlistItem> items;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WishlistItem> WishlistItems;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShoppingCartItem> ShoppingCartItems;

    public Product(){
    }

    public Product(ProductDto productDto){
        this.id = productDto.getId();
        this.name = productDto.getName();
        this.smallDescription = productDto.getSmallDescription();
        this.images = productDto.getImages();
        this.category = productDto.getCategory();
        this.brand = productDto.getBrand();
        this.retailPrice = productDto.getRetailPrice();
        this.price = productDto.getPrice();
        this.recentlySold = productDto.getRecentlySold();
        this.color = productDto.getColor();
        this.releaseYear = productDto.getReleaseYear();
        this.fullDescription = productDto.getFullDescription();
        this.sizes = productDto.getSizes();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSmallDescription() {
        return smallDescription;
    }

    public void setSmallDescription(String smallDescription) {
        this.smallDescription = smallDescription;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(double retailPrice) {
        this.retailPrice = retailPrice;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getRecentlySold() {
        return recentlySold;
    }

    public void setRecentlySold(int recentlySold) {
        this.recentlySold = recentlySold;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public List<String> getSizes() {
        return sizes;
    }

    public void setSizes(List<String> sizes) {
        this.sizes = sizes;
    }
}

