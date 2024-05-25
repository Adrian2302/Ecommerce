package com.ecommerce.api.controllers;

import com.ecommerce.api.dtos.OrdersDto;
import com.ecommerce.api.services.OrdersService;
import com.ecommerce.api.services.ShoppingCartItemService;
import com.ecommerce.api.services.ShoppingCartService;
import com.ecommerce.api.dtos.*;
import com.ecommerce.api.entities.Orders;
import com.ecommerce.api.entities.User;
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

