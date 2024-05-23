package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.dtos.WishlistDto;
import com.tericcabrel.authapi.dtos.WishlistItemDto;
import com.tericcabrel.authapi.entities.*;
import com.tericcabrel.authapi.exceptions.NoSizeSelectedException;
import com.tericcabrel.authapi.exceptions.ProductAlreadyInCartException;
import com.tericcabrel.authapi.exceptions.ProductNotFoundException;
import com.tericcabrel.authapi.exceptions.UserNotFoundException;
import com.tericcabrel.authapi.repositories.ProductRepository;
import com.tericcabrel.authapi.repositories.WishlistRepository;
import com.tericcabrel.authapi.repositories.UserRepository;
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

//        for (WishlistItem existingItem : userWishlist.getItems()) {
//            if (existingItem.getProduct().getId().equals(itemDto.getProduct().getId()) && existingItem.getSize().equals(itemDto.getSize())) {
//                throw new ProductAlreadyInCartException();
//            } else if (product.getSizes() != null && itemDto.getSize() == null) {
//                throw new NoSizeSelectedException();
//            }
//        }

        WishlistItem wishlistItem = new WishlistItem();
        wishlistItem.setProduct(product);
        wishlistItem.setWishlist(userWishlist);
        wishlistItem.setQuantity(1);
        wishlistItem.setPrice(product.getPrice());

        if(product.getSizes() != null){
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

    //SIRVE
//    @Transactional
//    public void removeItemFromWishlist(Integer userId, Long itemId) {
//        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
//
//        Wishlist userWishlist = user.getWishlist();
//        WishlistItem itemToRemove = userWishlist.getItems().stream()
//                .filter(item -> item.getProduct().getId().equals(itemId))
//                .findFirst()
//                .orElseThrow(ProductNotFoundException::new);
//
//        userWishlist.getItems().remove(itemToRemove);
//        wishlistRepository.save(userWishlist);
//    }

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

