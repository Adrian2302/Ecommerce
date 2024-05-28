package com.ecommerce.api.services;

import com.ecommerce.api.dtos.ShoppingCartDto;
import com.ecommerce.api.dtos.ShoppingCartItemDto;
import com.ecommerce.api.entities.*;
import com.ecommerce.api.exceptions.NoSizeSelectedException;
import com.ecommerce.api.exceptions.ProductAlreadyInCartException;
import com.ecommerce.api.exceptions.ProductNotFoundException;
import com.ecommerce.api.exceptions.UserNotFoundException;
import com.ecommerce.api.repositories.*;
import com.ecommerce.api.entities.*;
import com.ecommerce.api.exceptions.*;
import com.ecommerce.api.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ShoppingCartItemRepository shoppingCartItemRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ShoppingCartDto addItemToShoppingCart(Integer userId, ShoppingCartItemDto itemDto) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }

        ShoppingCart userShoppingCart = user.getShoppingCart();
        Product product = productRepository.findById(itemDto.getProduct().getId()).orElse(null);

        if (product == null) {
            throw new ProductNotFoundException();
        }
        for (ShoppingCartItem existingItem : userShoppingCart.getItems()) {
            if (existingItem.getProduct().getId().equals(itemDto.getProduct().getId())) {
                if(product.getSizes().isEmpty()){
                    throw new ProductAlreadyInCartException();
                }else if(existingItem.getSize().equals(itemDto.getSize())){
                    throw new ProductAlreadyInCartException();
                }

            } else if (!product.getSizes().isEmpty() && itemDto.getSize() == null) {
                throw new NoSizeSelectedException();
            }
        }

        ShoppingCartItem shoppingCartItem = new ShoppingCartItem();
        shoppingCartItem.setProduct(product);
        shoppingCartItem.setShoppingCart(userShoppingCart);
        shoppingCartItem.setQuantity(1);
        shoppingCartItem.setPrice(product.getPrice());
        shoppingCartItem.setSize(itemDto.getSize());

        userShoppingCart.getItems().add(shoppingCartItem);
        shoppingCartRepository.save(userShoppingCart);

        return new ShoppingCartDto(userShoppingCart);
    }


    public ShoppingCartDto getUserShoppingCart(Integer id) {
        return new ShoppingCartDto(shoppingCartRepository.findByUserId(id));
    }

    @Transactional
    public void wishlistToShoppingCart(Integer userId) {
        ShoppingCart userShoppingCart = shoppingCartRepository.findByUserId(userId);
        Wishlist userWishlist = wishlistRepository.findByUserId(userId);

        for (WishlistItem existingWishlistItem : userWishlist.getItems()) {
            Product product = productRepository.findById(existingWishlistItem.getProduct().getId()).orElse(null);

            if (product == null) {
                throw new ProductNotFoundException();
            }

            ShoppingCartItem existingCartItem = userShoppingCart.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(product.getId()))
                    .findFirst()
                    .orElse(null);

            if (existingCartItem != null) {
                boolean sizeMatches = !product.getSizes().isEmpty() && existingCartItem.getSize().equals(existingWishlistItem.getSize());
                if (sizeMatches || product.getSizes().isEmpty()) {
                    existingCartItem.setQuantity(existingCartItem.getQuantity() + existingWishlistItem.getQuantity());
                    shoppingCartItemRepository.save(existingCartItem);
                } else {
                    ShoppingCartItem newShoppingCartItem = createNewShoppingCartItem(product, userShoppingCart, existingWishlistItem);
                    userShoppingCart.getItems().add(newShoppingCartItem);
                    shoppingCartRepository.save(userShoppingCart);
                }
            } else {
                ShoppingCartItem newShoppingCartItem = createNewShoppingCartItem(product, userShoppingCart, existingWishlistItem);
                userShoppingCart.getItems().add(newShoppingCartItem);
                shoppingCartRepository.save(userShoppingCart);
            }
        }
        userWishlist.getItems().clear();
        wishlistRepository.save(userWishlist);
    }

    private ShoppingCartItem createNewShoppingCartItem(Product product, ShoppingCart userShoppingCart, WishlistItem existingWishlistItem) {
        ShoppingCartItem newShoppingCartItem = new ShoppingCartItem();
        newShoppingCartItem.setProduct(product);
        newShoppingCartItem.setShoppingCart(userShoppingCart);
        newShoppingCartItem.setQuantity(existingWishlistItem.getQuantity());
        newShoppingCartItem.setPrice(product.getPrice());
        newShoppingCartItem.setSize(existingWishlistItem.getSize());
        return newShoppingCartItem;
    }


    @Transactional
    public void removeItemFromShoppingCart(Integer userId, Long itemId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        ShoppingCart userShoppingCart = user.getShoppingCart();
        ShoppingCartItem itemToRemove = userShoppingCart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(ProductNotFoundException::new);

        userShoppingCart.getItems().remove(itemToRemove);
        shoppingCartRepository.save(userShoppingCart);
    }


}

