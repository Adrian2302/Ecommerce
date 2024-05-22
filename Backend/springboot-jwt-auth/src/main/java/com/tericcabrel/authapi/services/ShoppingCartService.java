package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.dtos.ProductDto;
import com.tericcabrel.authapi.dtos.ShoppingCartDto;
import com.tericcabrel.authapi.dtos.ShoppingCartItemDto;
import com.tericcabrel.authapi.entities.*;
import com.tericcabrel.authapi.exceptions.*;
import com.tericcabrel.authapi.repositories.ProductRepository;
import com.tericcabrel.authapi.repositories.ShoppingCartItemRepository;
import com.tericcabrel.authapi.repositories.ShoppingCartRepository;
import com.tericcabrel.authapi.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShoppingCartService {
//    private final ProductRepository productRepository;
//
//    public ProductService(ProductRepository productRepository) {
//        this.productRepository = productRepository;
//    }


    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ShoppingCartItemRepository shoppingCartItemRepository;

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
            throw new RuntimeException("Product not found");
        }

        for (ShoppingCartItem existingItem : userShoppingCart.getItems()) {
            if (existingItem.getProduct().getId().equals(itemDto.getProduct().getId()) && existingItem.getSize().equals(itemDto.getSize())) {
                throw new ProductAlreadyInCartException();
            } else if (product.getSizes() != null && itemDto.getSize() == null) {
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

//    public ShoppingCartDto addItemToShoppingCart(Integer userId, ShoppingCartItemDto itemDto) {
//        User user = userRepository.findById(userId).orElse(null);
//        if (user == null) {
//            throw new UserNotFoundException();
//        }
//
//        ShoppingCart shoppingCart = user.getShoppingCart();
//        ProductDto itemProduct = itemDto.getProduct();
//        final var product = productRepository.findById(itemProduct.getId()).orElse(null);
//
//        if (product == null){
//            throw new RuntimeException("Product not found");
//        }
//
//        for (ShoppingCartItem existingItem : shoppingCart.getItems()) {
//            if (existingItem.getProduct().getId().equals(itemDto.getProduct().getId()) && existingItem.getSize().equals(itemDto.getSize())) {
//                throw new ProductAlreadyInCartException();
//            } else if(itemProduct.getSizes() != null && itemDto.getSize() == null) {
//                throw new NoSizeSelectedException();
//            }
//        }
//
//        itemDto.setProduct(new ProductDto(product));
//        itemDto.setShoppingCart(new ShoppingCartDto(user.getShoppingCart()));
//        itemDto.setQuantity(1);
//        itemDto.setPrice(product.getPrice());
//
//        ShoppingCartItem shoppingCartItem = new ShoppingCartItem(itemDto);
//        shoppingCartItem.setShoppingCart(shoppingCart);
//        shoppingCart.getItems().add(shoppingCartItem);
//
//        shoppingCartRepository.save(shoppingCart);
//
//        return new ShoppingCartDto(shoppingCart);
//    }

//    public ShoppingCartDto addItemToShoppingCart(Integer userId, ShoppingCartItemDto item){
//        User user = userRepository.findById(userId).orElse(null);
//        if (user == null){
//            throw new ProductAlreadyExistException();
//        }
//        ShoppingCart shoppingCart = user.getShoppingCart();
//
//        if (shoppingCart == null) {
//            shoppingCart = new ShoppingCart();
//            user.setShoppingCart(shoppingCart);
//        }
//
//        ProductDto product = item.getProduct();
//        item.setQuantity(1);
//        item.setPrice(product.getPrice());
//        item.setShoppingCart(new ShoppingCartDto(user.getShoppingCart()));
//
//        shoppingCart.getItems().add(new ShoppingCartItem(item));
//
//        this.shoppingCartRepository.save(shoppingCart);
//
//        return new ShoppingCartDto(shoppingCart);
//    }

    public ShoppingCartDto getUserShoppingCart(Long id) {
//        return shoppingCartRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        return new ShoppingCartDto(shoppingCartRepository.findByUserId(id));
    }

//    @Transactional
//    public void removeItemFromShoppingCart(Long userId, Long itemId) {
//        ShoppingCart shoppingCart = shoppingCartRepository.findByUserId(userId);
//        ShoppingCartItem item = shoppingCartItemRepository.findById(itemId).orElseThrow();
//        shoppingCart.getItems().remove(item);
//        shoppingCartItemRepository.delete(item);
//        shoppingCartRepository.save(shoppingCart);
//    }

//    @Transactional
//    public void
//    removeItemFromShoppingCart(ShoppingCart userShoppingCart, Long itemId) {
////        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
////
////        ShoppingCart userShoppingCart = user.getShoppingCart();
//        ShoppingCartItem itemToRemove = userShoppingCart.getItems().stream()
//                .filter(item -> item.getId().equals(itemId))
//                .findFirst()
//                .orElseThrow(ProductNotFoundException::new);
//
//        userShoppingCart.getItems().remove(itemToRemove);
//        shoppingCartRepository.save(userShoppingCart);
//    }

//    @Transactional
//    public void removeItemFromShoppingCart(Integer userId, Long itemId, String size) {
//        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
//
//        ShoppingCart userShoppingCart = user.getShoppingCart();
//        ShoppingCartItem itemToRemove = userShoppingCart.getItems().stream()
//                .filter(item -> item.getProduct().getId().equals(itemId) && (item.getSize().equals(size)))
//                .findFirst()
//                .orElseThrow(ProductNotFoundException::new);
//
//        userShoppingCart.getItems().remove(itemToRemove);
//        shoppingCartRepository.save(userShoppingCart);
//    }

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

//    @Transactional
//    public void editShoppingCartItemQuantity(ShoppingCartDto userShoppingCart, Long itemId, Long quantity) {
//        ShoppingCartItem itemToEdit = userShoppingCart.getItems().stream()
//                .filter(item -> item.getId().equals(itemId))
//                .findFirst()
//                .orElseThrow(ProductNotFoundException::new);
//
//        userShoppingCart.getItems().find
//    }

//    public ShoppingCartDto addItemToShoppingCart(Integer userId, ShoppingCartItemDto item){
//        User user = userRepository.findById(userId).orElse(null);
//        if (user == null){
//            throw new ProductAlreadyExistException();
//        }
//        ShoppingCart shoppingCart = user.getShoppingCart();
//
//        if (shoppingCart == null) {
//            shoppingCart = new ShoppingCart();
//            user.setShoppingCart(shoppingCart);
//        }
//
//        ProductDto product = item.getProduct();
//        item.setQuantity(1);
//        item.setPrice(product.getPrice());
//        item.setShoppingCart(new ShoppingCartDto(user.getShoppingCart()));
//
//        shoppingCart.getItems().add(new ShoppingCartItem(item));
//        final var shoppingCartAdded = this.shoppingCartRepository.save(shoppingCart);
//        return new ShoppingCartDto(shoppingCartAdded);
//    }

}

