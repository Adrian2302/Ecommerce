package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.dtos.WishlistDto;
import com.tericcabrel.authapi.dtos.WishlistItemDto;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.services.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/{id}")
    public ResponseEntity<WishlistDto> addItemToWishlist(@PathVariable Integer id, @RequestBody WishlistItemDto item) {
        WishlistDto wishlistDto = wishlistService.addItemToWishlist(id, item);
        return new ResponseEntity<>(wishlistDto, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<WishlistDto> getUserWishlist(@PathVariable Long id) {
        WishlistDto wishlistDto = wishlistService.getUserWishlist(id);
        return new ResponseEntity<>(wishlistDto, HttpStatus.OK);
    }

    @GetMapping("/exist/{userId}/{itemId}")
    public ResponseEntity<Boolean> getIsItemInWishlist(@PathVariable Integer userId, @PathVariable Long itemId) {
        boolean wishlistDto = wishlistService.isItemInWishlist(userId, itemId);
        return new ResponseEntity<>(wishlistDto, HttpStatus.OK);
    }

//    @DeleteMapping("/remove/{userId}/{itemId}")
//    public ResponseEntity<Void> removeItemFromWishlist(@PathVariable Integer userId, @PathVariable Long itemId) {
//        wishlistService.removeItemFromWishlist(userId, itemId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Void> removeItemFromWishlist(@PathVariable Long itemId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        wishlistService.removeItemFromWishlist(currentUser.getId(), itemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

