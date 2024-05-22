package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.dtos.ShoppingCartDto;
import com.tericcabrel.authapi.dtos.ShoppingCartItemDto;
import com.tericcabrel.authapi.entities.Product;
import com.tericcabrel.authapi.entities.ShoppingCart;
import com.tericcabrel.authapi.entities.ShoppingCartItem;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.exceptions.NoSizeSelectedException;
import com.tericcabrel.authapi.exceptions.ProductAlreadyInCartException;
import com.tericcabrel.authapi.exceptions.ProductNotFoundException;
import com.tericcabrel.authapi.exceptions.UserNotFoundException;
import com.tericcabrel.authapi.repositories.ProductRepository;
import com.tericcabrel.authapi.repositories.ShoppingCartItemRepository;
import com.tericcabrel.authapi.repositories.ShoppingCartRepository;
import com.tericcabrel.authapi.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class ShoppingCartItemService {

    @Autowired
    private ShoppingCartItemRepository shoppingCartItemRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Transactional
    public void removeItemFromShoppingCart(Long itemId, Long cartId) {

        final var optionalShoppingCart = shoppingCartRepository.findById(cartId);

        if(optionalShoppingCart.isEmpty()) {
            throw new NoSuchElementException("sadsadsad");
        }

        final var shoppingCart = optionalShoppingCart.get();


        final var optionalShoppingCartItem = shoppingCartItemRepository.findById(itemId);

        if(optionalShoppingCartItem.isEmpty()) {
            throw new NoSuchElementException("sadsadsad");
        }

        final var shoppingCartItem = optionalShoppingCartItem.get();

        if(shoppingCart.getId().equals(shoppingCartItem.getShoppingCart().getId())){
            shoppingCartItemRepository.deleteById(itemId);
        }
    }

    @Transactional
    public void editShoppingCartItemQuantity(User user, Long itemId, int quantity) {
        final var optionalShoppingCartItem = shoppingCartItemRepository.findById(itemId).orElseThrow(ProductNotFoundException::new);

        if(user.getShoppingCart().getId().equals(optionalShoppingCartItem.getShoppingCart().getId())){
            optionalShoppingCartItem.setQuantity(quantity);
        } else {
            throw new ProductNotFoundException();
        }
//        optionalShoppingCartItem.setPrice(quantity*optionalShoppingCartItem.getPrice());
        shoppingCartItemRepository.save(optionalShoppingCartItem);
    }

    @Transactional
    public boolean deleteShoppingCartItemById(Long id) {
        if (shoppingCartItemRepository.existsById(id)) {
            shoppingCartItemRepository.deleteById(id);
            return true;
        }
        throw new ProductNotFoundException();
    }

}

