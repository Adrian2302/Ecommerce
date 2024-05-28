package com.ecommerce.api.services;

import com.ecommerce.api.entities.User;
import com.ecommerce.api.exceptions.ProductNotFoundException;
import com.ecommerce.api.repositories.ShoppingCartItemRepository;
import com.ecommerce.api.repositories.ShoppingCartRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartItemService {

    @Autowired
    private ShoppingCartItemRepository shoppingCartItemRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Transactional
    public void editShoppingCartItemQuantity(User user, Long itemId, int quantity) {
        final var optionalShoppingCartItem = shoppingCartItemRepository.findById(itemId).orElseThrow(ProductNotFoundException::new);

        if(user.getShoppingCart().getId().equals(optionalShoppingCartItem.getShoppingCart().getId())){
            optionalShoppingCartItem.setQuantity(quantity);
        } else {
            throw new ProductNotFoundException();
        }
        shoppingCartItemRepository.save(optionalShoppingCartItem);
    }


}

