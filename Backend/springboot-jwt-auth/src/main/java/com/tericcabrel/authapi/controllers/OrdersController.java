package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.dtos.*;
import com.tericcabrel.authapi.entities.Orders;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.services.OrdersService;
import com.tericcabrel.authapi.services.ShoppingCartItemService;
import com.tericcabrel.authapi.services.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrdersController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ShoppingCartItemService shoppingCartItemService;

    @Autowired
    private OrdersService ordersService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<OrdersDto> createOrder(@RequestBody OrdersDto ordersDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        OrdersDto orderDto = ordersService.createOrder(currentUser.getId(), ordersDto);
        return new ResponseEntity<>(orderDto, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<Orders>> getOrders() {
        List<Orders> userOrders = ordersService.allOrders();
        return new ResponseEntity<>(userOrders, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<OrdersDto>> getUserOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<OrdersDto> userOrders = ordersService.getUserOrders(currentUser.getId());
        return new ResponseEntity<>(userOrders, HttpStatus.OK);
    }

//    @PutMapping("/convertToOrder")
//    public ResponseEntity<Void> ShoppingCartToOrder() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User currentUser = (User) authentication.getPrincipal();
//
//        ordersService.ShoppingCartToOrder(currentUser.getId());
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @PutMapping("/editStatus")
//    public ResponseEntity<Void> editOrderStatus(@RequestBody OrdersDto ordersDto) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User currentUser = (User) authentication.getPrincipal();
//
//        ordersService.editOrderStatus(currentUser, ordersDto.getId(), ordersDto.getStatus());
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @DeleteMapping("/remove")
//    public ResponseEntity<Void> removeOrder(@RequestBody OrdersDto ordersDto) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User currentUser = (User) authentication.getPrincipal();
//
//        ordersService.removeOrder(currentUser.getId(), ordersDto.getId());
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

}

