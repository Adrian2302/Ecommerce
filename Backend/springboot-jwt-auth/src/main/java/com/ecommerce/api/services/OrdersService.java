package com.ecommerce.api.services;

import com.ecommerce.api.dtos.OrdersDto;
import com.ecommerce.api.dtos.UserDto;
import com.ecommerce.api.entities.*;
import com.ecommerce.api.exceptions.InvalidCreditCardException;
import com.ecommerce.api.exceptions.OrderNotFoundException;
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

        final var shortCardNumber = String.valueOf(newOrderDto.getCardNumber()).substring(String.valueOf(newOrderDto.getCardNumber()).length()-3);
        Long newCardNumber = Long.parseLong(shortCardNumber);

        newOrderDto.setCardNumber(newCardNumber);
        newOrderDto.setUser(new UserDto(user));
        Orders newOrder = new Orders(newOrderDto);
        newOrder.setItems(new ArrayList<>());

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

    @Transactional
    public void editOrderStatus(Long orderId, StatusEnum newStatus) {
        final var optionalOrder = ordersRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
        optionalOrder.setStatus(newStatus);
        ordersRepository.save(optionalOrder);
    }

    public void deleteOrder(Long id) {
        ordersRepository.deleteById(id);
    }

    public void validateOrder(OrdersDto newOrderDto){
        if(!validateCreditCard(newOrderDto.getCardNumber())){
            throw new InvalidCreditCardException();
        }
    }

    public static boolean validateCreditCard(Long cardNumber) {
        String cleanedNumber = cardNumber.toString().replaceAll("\\D", "");

        boolean isVisa = cleanedNumber.matches("^4\\d{12}(?:\\d{3})?$");
        boolean isMastercard = cleanedNumber.matches("^5[1-5]\\d{14}$");
        boolean isAmex = cleanedNumber.matches("^3[47]\\d{13}$");

        boolean isValidLuhn = isValidLuhn(cleanedNumber);

        return (isVisa || isMastercard || isAmex) && isValidLuhn;
    }

    private static boolean isValidLuhn(String num) {
        int sum = 0;
        boolean alternate = false;
        for (int i = num.length() - 1; i >= 0; i--) {
            int n = Integer.parseInt(num.substring(i, i + 1));
            if (alternate) {
                n *= 2;
                if (n > 9) {
                    n -= 9;
                }
            }
            sum += n;
            alternate = !alternate;
        }
        return (sum % 10 == 0);
    }
}

