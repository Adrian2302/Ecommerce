package com.ecommerce.api.controllers;

import com.ecommerce.api.services.ShoppingCartItemService;
import com.ecommerce.api.services.ShoppingCartService;
import com.ecommerce.api.dtos.ShoppingCartDto;
import com.ecommerce.api.dtos.ShoppingCartItemDto;
import com.ecommerce.api.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {

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

}

