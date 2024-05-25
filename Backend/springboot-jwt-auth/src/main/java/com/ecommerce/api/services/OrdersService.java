package com.ecommerce.api.services;

import com.ecommerce.api.dtos.OrdersDto;
import com.ecommerce.api.dtos.UserDto;
import com.ecommerce.api.entities.*;
import com.ecommerce.api.repositories.*;
import com.ecommerce.api.dtos.*;
import com.ecommerce.api.entities.*;
import com.ecommerce.api.exceptions.ProductNotFoundException;
import com.ecommerce.api.exceptions.UserNotFoundException;
import com.ecommerce.api.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrdersService {
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

    @Autowired
    private OrdersRepository ordersRepository;

    @Transactional
    public OrdersDto createOrder(Integer userId, OrdersDto newOrderDto) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        ShoppingCart userShoppingCart = shoppingCartRepository.findByUserId(userId);

        newOrderDto.setUser(new UserDto(user));
        Orders newOrder = new Orders(newOrderDto);
        newOrder.setItems(new ArrayList<>());
//        newOrder.setUser(user);

        for (ShoppingCartItem shoppingCartItem : userShoppingCart.getItems()) {
            Product product = productRepository.findById(shoppingCartItem.getProduct().getId())
                    .orElseThrow(ProductNotFoundException::new);

            OrdersItem newOrdersItem = new OrdersItem();
            newOrdersItem.setOrders(newOrder);
            newOrdersItem.setProductName(product.getName());
            newOrdersItem.setQuantity(shoppingCartItem.getQuantity());
            newOrdersItem.setPrice(product.getPrice());
            newOrdersItem.setSize(shoppingCartItem.getSize());

            newOrder.getItems().add(newOrdersItem);
        }

        userShoppingCart.getItems().clear();
        shoppingCartRepository.save(userShoppingCart);

        Orders savedOrder = ordersRepository.save(newOrder);

        return new OrdersDto(savedOrder);
    }


    public List<Orders> allOrders() {
        return new ArrayList<>(ordersRepository.findAll());
    }

    public List<Orders> getUserOrders(Integer id) {
        return ordersRepository.findByUserId(id);
    }
//
//    @Transactional
//    public void wishlistToShoppingCart(Integer userId) {
//        ShoppingCart userShoppingCart = shoppingCartRepository.findByUserId(userId);
//        Wishlist userWishlist = wishlistRepository.findByUserId(userId);
//
//        for (WishlistItem existingWishlistItem : userWishlist.getItems()) {
//            Product product = productRepository.findById(existingWishlistItem.getProduct().getId()).orElse(null);
//
//            if (product == null) {
//                throw new ProductNotFoundException();
//            }
//
////            ShoppingCartItem existingCartItem = shoppingCartItemRepository.findByProductId(product.getId());
//            ShoppingCartItem existingCartItem = userShoppingCart.getItems().stream()
//                    .filter(item -> item.getProduct().getId().equals(product.getId()))
//                    .findFirst()
//                    .orElse(null);
//
//            if(existingCartItem != null) {
//                if(!product.getSizes().isEmpty() && existingCartItem.getSize().equals(existingWishlistItem.getSize())){
//                    existingCartItem.setQuantity(existingCartItem.getQuantity() + existingWishlistItem.getQuantity());
//                    shoppingCartItemRepository.save(existingCartItem);
//                }else{
//                    existingCartItem.setQuantity(existingCartItem.getQuantity() + existingWishlistItem.getQuantity());
//                    shoppingCartItemRepository.save(existingCartItem);
//                }
//            }else{
//                ShoppingCartItem newShoppingCartItem = new ShoppingCartItem();
//                newShoppingCartItem.setProduct(product);
//                newShoppingCartItem.setShoppingCart(userShoppingCart);
//                newShoppingCartItem.setQuantity(existingWishlistItem.getQuantity());
//                newShoppingCartItem.setPrice(product.getPrice());
//                newShoppingCartItem.setSize(existingWishlistItem.getSize());
//
//                userShoppingCart.getItems().add(newShoppingCartItem);
//                shoppingCartRepository.save(userShoppingCart);
//            }
//
//        }
//        userWishlist.getItems().clear();
//        wishlistRepository.save(userWishlist);
//    }
//
//
//    @Transactional
//    public void removeItemFromShoppingCart(Integer userId, Long itemId) {
//        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
//
//        ShoppingCart userShoppingCart = user.getShoppingCart();
//        ShoppingCartItem itemToRemove = userShoppingCart.getItems().stream()
//                .filter(item -> item.getId().equals(itemId))
//                .findFirst()
//                .orElseThrow(ProductNotFoundException::new);
//
//        userShoppingCart.getItems().remove(itemToRemove);
//        shoppingCartRepository.save(userShoppingCart);
//    }


}

