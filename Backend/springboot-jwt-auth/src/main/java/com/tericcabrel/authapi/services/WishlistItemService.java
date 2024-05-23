package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.exceptions.ProductNotFoundException;
import com.tericcabrel.authapi.repositories.ShoppingCartItemRepository;
import com.tericcabrel.authapi.repositories.ShoppingCartRepository;
import com.tericcabrel.authapi.repositories.WishlistItemRepository;
import com.tericcabrel.authapi.repositories.WishlistRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WishlistItemService {

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

//    @Transactional
//    public void removeItemFromShoppingCart(Long itemId, Long cartId) {
//
//        final var optionalShoppingCart = shoppingCartRepository.findById(cartId);
//
//        if(optionalShoppingCart.isEmpty()) {
//            throw new NoSuchElementException("sadsadsad");
//        }
//
//        final var shoppingCart = optionalShoppingCart.get();
//
//
//        final var optionalShoppingCartItem = shoppingCartItemRepository.findById(itemId);
//
//        if(optionalShoppingCartItem.isEmpty()) {
//            throw new NoSuchElementException("sadsadsad");
//        }
//
//        final var shoppingCartItem = optionalShoppingCartItem.get();
//
//        if(shoppingCart.getId().equals(shoppingCartItem.getShoppingCart().getId())){
//            shoppingCartItemRepository.deleteById(itemId);
//        }
//    }

    @Transactional
    public void editWishlistItemQuantity(User user, Long itemId, int quantity) {
        final var optionalWishlistItem = wishlistItemRepository.findById(itemId).orElseThrow(ProductNotFoundException::new);

        if(user.getShoppingCart().getId().equals(optionalWishlistItem.getWishlist().getId())){
            optionalWishlistItem.setQuantity(quantity);
        } else {
            throw new ProductNotFoundException();
        }
//        optionalShoppingCartItem.setPrice(quantity*optionalShoppingCartItem.getPrice());
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

//    @Transactional
//    public boolean deleteShoppingCartItemById(Long id) {
//        if (shoppingCartItemRepository.existsById(id)) {
//            shoppingCartItemRepository.deleteById(id);
//            return true;
//        }
//        throw new ProductNotFoundException();
//    }

}

