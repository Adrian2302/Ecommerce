package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.dtos.OrdersDto;
import com.tericcabrel.authapi.dtos.ProductDto;
import com.tericcabrel.authapi.dtos.ShoppingCartDto;
import com.tericcabrel.authapi.dtos.ShoppingCartItemDto;
import com.tericcabrel.authapi.entities.*;
import com.tericcabrel.authapi.exceptions.NoSizeSelectedException;
import com.tericcabrel.authapi.exceptions.ProductAlreadyInCartException;
import com.tericcabrel.authapi.exceptions.ProductNotFoundException;
import com.tericcabrel.authapi.exceptions.UserNotFoundException;
import com.tericcabrel.authapi.repositories.*;
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
    public OrdersDto createOrder(Integer userId, OrdersDto newUserOder) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }

        ShoppingCart userShoppingCart = shoppingCartRepository.findByUserId(userId);

        Orders orderAdded = this.ordersRepository.save(new Orders(newUserOder));
        orderAdded.setUser(user);

        for (ShoppingCartItem existingShoppingCartItem : userShoppingCart.getItems()) {
            Product product = productRepository.findById(existingShoppingCartItem.getProduct().getId()).orElse(null);

            if (product == null) {
                throw new ProductNotFoundException();
            }

            OrdersItem newOrdersItem = new OrdersItem();
            newOrdersItem.setOrders(orderAdded);
            newOrdersItem.setProductName(product.getName());
            newOrdersItem.setQuantity(existingShoppingCartItem.getQuantity());
            newOrdersItem.setPrice(product.getPrice());
            newOrdersItem.setSize(existingShoppingCartItem.getSize());

            orderAdded.getItems().add(newOrdersItem);
        }

        userShoppingCart.getItems().clear();
        shoppingCartRepository.save(userShoppingCart);

        this.ordersRepository.save(orderAdded);
        return new OrdersDto(orderAdded);
    }

    public List<Orders> allOrders() {
        return new ArrayList<>(ordersRepository.findAll());
    }

    public List<OrdersDto> getUserOrders(Integer id) {
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

