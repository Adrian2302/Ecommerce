package com.ecommerce.api.dtos;

import com.ecommerce.api.entities.Product;

import java.util.List;

public class ProductDto {
    private Long id;
    private String name;
    private String smallDescription;
    private List<String> images;
    private String category;
    private String brand;
    private double retailPrice;
    private double price;
    private int recentlySold;
    private String color;
    private int releaseYear;
    private String fullDescription;
    private List<String> sizes;

    public ProductDto(Long id, String name, String smallDescription, List<String> images, String category, String brand, double retailPrice, double price, int recentlySold, String color, int releaseYear, String fullDescription, List<String> sizes) {
        this.id = id;
        this.name = name;
        this.smallDescription = smallDescription;
        this.images = images;
        this.category = category;
        this.brand = brand;
        this.retailPrice = retailPrice;
        this.price = price;
        this.recentlySold = recentlySold;
        this.color = color;
        this.releaseYear = releaseYear;
        this.fullDescription = fullDescription;
        this.sizes = sizes;
    }

    public ProductDto(Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.smallDescription = product.getSmallDescription();
        this.images = product.getImages();
        this.category = product.getCategory();
        this.brand = product.getBrand();
        this.retailPrice = product.getRetailPrice();
        this.price = product.getPrice();
        this.recentlySold = product.getRecentlySold();
        this.color = product.getColor();
        this.releaseYear = product.getReleaseYear();
        this.fullDescription = product.getFullDescription();
        this.sizes = product.getSizes();
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

