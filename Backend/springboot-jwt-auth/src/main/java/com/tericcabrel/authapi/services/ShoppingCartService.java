package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.dtos.ProductDto;
import com.tericcabrel.authapi.dtos.ShoppingCartDto;
import com.tericcabrel.authapi.dtos.ShoppingCartItemDto;
import com.tericcabrel.authapi.entities.*;
import com.tericcabrel.authapi.exceptions.*;
import com.tericcabrel.authapi.repositories.*;
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

    public ShoppingCartDto getUserShoppingCart(Integer id) {
//        return shoppingCartRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
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

//            ShoppingCartItem existingCartItem = shoppingCartItemRepository.findByProductId(product.getId());
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
//            for (ShoppingCartItem existingCartItem : userShoppingCart.getItems()) {
//                if (existingCartItem.getProduct().getId().equals(existingWishlistItem.getProduct().getId())) {
//                    if (product.getSizes().isEmpty()) {
//                        existingCartItem.setQuantity(existingCartItem.getQuantity() + existingWishlistItem.getQuantity());
//                        shoppingCartItemRepository.save(existingCartItem);
//                    } else if (existingCartItem.getSize().equals(existingWishlistItem.getSize())) {
//                        existingCartItem.setQuantity(existingCartItem.getQuantity() + existingWishlistItem.getQuantity());
//                        shoppingCartItemRepository.save(existingCartItem);
//                    }
//                }
//            }
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

