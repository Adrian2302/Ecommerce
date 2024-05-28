package com.ecommerce.api.controllers;

import com.ecommerce.api.services.WishlistItemService;
import com.ecommerce.api.services.WishlistService;
import com.ecommerce.api.dtos.WishlistDto;
import com.ecommerce.api.dtos.WishlistItemDto;
import com.ecommerce.api.entities.User;
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

    @Autowired
    private WishlistItemService wishlistItemService;

    @PostMapping("/{id}")
    public ResponseEntity<WishlistDto> addItemToWishlist(@PathVariable Integer id, @RequestBody WishlistItemDto item) {
        WishlistDto wishlistDto = wishlistService.addItemToWishlist(id, item);
        return new ResponseEntity<>(wishlistDto, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<WishlistDto> getUserWishlist() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        WishlistDto wishlistDto = wishlistService.getUserWishlist(currentUser.getId());
        return new ResponseEntity<>(wishlistDto, HttpStatus.OK);
    }

    @GetMapping("/exist/{userId}/{itemId}")
    public ResponseEntity<Boolean> getIsItemInWishlist(@PathVariable Integer userId, @PathVariable Long itemId) {
        boolean wishlistDto = wishlistService.isItemInWishlist(userId, itemId);
        return new ResponseEntity<>(wishlistDto, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Void> removeItemFromWishlist(@PathVariable Long itemId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        wishlistService.removeItemFromWishlist(currentUser.getId(), itemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/editQuantity")
    public ResponseEntity<Void> editWishlistItemQuantity(@RequestBody WishlistItemDto wishlistItemDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        wishlistItemService.editWishlistItemQuantity(currentUser, wishlistItemDto.getId(), wishlistItemDto.getQuantity());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/editSize")
    public ResponseEntity<Void> editWishlistItemSize(@RequestBody WishlistItemDto wishlistItemDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        wishlistItemService.editWishlistItemSize(currentUser, wishlistItemDto.getId(), wishlistItemDto.getSize());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

