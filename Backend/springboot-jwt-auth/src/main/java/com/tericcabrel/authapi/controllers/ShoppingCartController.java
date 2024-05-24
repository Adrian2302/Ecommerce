package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.dtos.RegisterUserDto;
import com.tericcabrel.authapi.dtos.ShoppingCartDto;
import com.tericcabrel.authapi.dtos.ShoppingCartItemDto;
import com.tericcabrel.authapi.entities.ShoppingCartItem;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.services.ShoppingCartItemService;
import com.tericcabrel.authapi.services.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {
//    private final ShoppingCartService shoppingCartService;
//
//    @Autowired
//    public ShoppingCartController(ShoppingCartService shoppingCartService) {
//        this.shoppingCartService = shoppingCartService;
//    }

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ShoppingCartItemService shoppingCartItemService;

    @PostMapping()
    public ResponseEntity<ShoppingCartDto> addItemToShoppingCart(@RequestBody ShoppingCartItemDto item) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        ShoppingCartDto shoppingCartDto = shoppingCartService.addItemToShoppingCart(currentUser.getId(), item);
        return new ResponseEntity<>(shoppingCartDto, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<ShoppingCartDto> getUserShoppingCart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        ShoppingCartDto shoppingCartDto = shoppingCartService.getUserShoppingCart(currentUser.getId());
        return new ResponseEntity<>(shoppingCartDto, HttpStatus.OK);
    }

    @PutMapping("/convertToShoppingCart")
    public ResponseEntity<Void> wishlistToShoppingCart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        shoppingCartService.wishlistToShoppingCart(currentUser.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @DeleteMapping("/remove/{itemId}")
//    public ResponseEntity<Void> removeItemFromShoppingCart(@PathVariable Long itemId) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        User currentUser = (User) authentication.getPrincipal();
//        shoppingCartItemService.removeItemFromShoppingCart(itemId, currentUser.getShoppingCart().getId());
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

//    @DeleteMapping("/remove/{itemId}")
//    public ResponseEntity<Void> removeItemFromShoppingCart(@PathVariable Long itemId) {
////        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
////        User currentUser = (User) authentication.getPrincipal();
////
////        shoppingCartService.removeItemFromShoppingCart(currentUser.getShoppingCart(), itemId);
//        shoppingCartItemService.deleteShoppingCartItemById(itemId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

//    @PutMapping("/editQuantity/{itemId}/{quantity}")
//    public ResponseEntity<Void> editShoppingCartItemQuantity(@PathVariable Long itemId, @PathVariable int quantity) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User currentUser = (User) authentication.getPrincipal();
//
//        shoppingCartItemService.editShoppingCartItemQuantity(currentUser, itemId, quantity);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

    @PutMapping("/editQuantity")
    public ResponseEntity<Void> editShoppingCartItemQuantity(@RequestBody ShoppingCartItemDto shoppingCartItemDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        shoppingCartItemService.editShoppingCartItemQuantity(currentUser, shoppingCartItemDto.getId(), shoppingCartItemDto.getQuantity());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Void> removeItemFromShoppingCart(@PathVariable Long itemId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        shoppingCartService.removeItemFromShoppingCart(currentUser.getId(), itemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @GetMapping("{id}")
//    public ResponseEntity<ShoppingCartDto> getUserShoppingCart(@PathVariable Long id) {
//        ShoppingCartDto shoppingCartDto = shoppingCartService.getUserShoppingCart(id);
//        return new ResponseEntity<>(shoppingCartDto, HttpStatus.OK);
//    }
}

