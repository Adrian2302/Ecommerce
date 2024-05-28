package com.ecommerce.api.services;

import com.ecommerce.api.entities.User;
import com.ecommerce.api.exceptions.ProductNotFoundException;
import com.ecommerce.api.repositories.WishlistItemRepository;
import com.ecommerce.api.repositories.WishlistRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WishlistItemService {

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Transactional
    public void editWishlistItemQuantity(User user, Long itemId, int quantity) {
        final var optionalWishlistItem = wishlistItemRepository.findById(itemId).orElseThrow(ProductNotFoundException::new);

        if(user.getShoppingCart().getId().equals(optionalWishlistItem.getWishlist().getId())){
            optionalWishlistItem.setQuantity(quantity);
        } else {
            throw new ProductNotFoundException();
        }
        wishlistItemRepository.save(optionalWishlistItem);
    }

    @Transactional
    public void editWishlistItemSize(User user, Long itemId, String size) {
        final var optionalWishlistItem = wishlistItemRepository.findById(itemId).orElseThrow(ProductNotFoundException::new);

        if(user.getShoppingCart().getId().equals(optionalWishlistItem.getWishlist().getId())){
            optionalWishlistItem.setSize(size);
        } else {
            throw new ProductNotFoundException();
        }
        wishlistItemRepository.save(optionalWishlistItem);
    }

}

