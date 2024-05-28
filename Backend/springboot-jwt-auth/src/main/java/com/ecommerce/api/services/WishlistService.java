package com.ecommerce.api.services;

import com.ecommerce.api.dtos.WishlistDto;
import com.ecommerce.api.dtos.WishlistItemDto;
import com.ecommerce.api.entities.Product;
import com.ecommerce.api.entities.User;
import com.ecommerce.api.entities.Wishlist;
import com.ecommerce.api.entities.WishlistItem;
import com.ecommerce.api.entities.*;
import com.ecommerce.api.exceptions.ProductNotFoundException;
import com.ecommerce.api.exceptions.UserNotFoundException;
import com.ecommerce.api.repositories.ProductRepository;
import com.ecommerce.api.repositories.WishlistRepository;
import com.ecommerce.api.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public WishlistDto addItemToWishlist(Integer userId, WishlistItemDto itemDto) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }

        Wishlist userWishlist = user.getWishlist();
        Product product = productRepository.findById(itemDto.getProduct().getId()).orElse(null);

        if (product == null) {
            throw new ProductNotFoundException();
        }

        WishlistItem wishlistItem = new WishlistItem();
        wishlistItem.setProduct(product);
        wishlistItem.setWishlist(userWishlist);
        wishlistItem.setQuantity(1);
        wishlistItem.setPrice(product.getPrice());

        if(!product.getSizes().isEmpty()){
            wishlistItem.setSize(product.getSizes().get(0));
        }

        userWishlist.getItems().add(wishlistItem);
        wishlistRepository.save(userWishlist);

        return new WishlistDto(userWishlist);
    }

    public WishlistDto getUserWishlist(Integer id) {
        return new WishlistDto(wishlistRepository.findByUserId(id));
    }

    public Boolean isItemInWishlist(Integer userId, Long itemId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }

        Wishlist userWishlist = user.getWishlist();
        for (WishlistItem existingItem : userWishlist.getItems()) {
            if (existingItem.getProduct().getId().equals(itemId)) {
                return true;
            }
        }
        return false;
    }

    @Transactional
    public void removeItemFromWishlist(Integer userId, Long itemId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Wishlist userWishlist = user.getWishlist();
        WishlistItem itemToRemove = userWishlist.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(itemId))
                .findFirst()
                .orElseThrow(ProductNotFoundException::new);

        userWishlist.getItems().remove(itemToRemove);
        wishlistRepository.save(userWishlist);
    }

}

