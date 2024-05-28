package com.ecommerce.api.services;

import com.ecommerce.api.dtos.OrdersDto;
import com.ecommerce.api.dtos.UserDto;
import com.ecommerce.api.entities.*;
import com.ecommerce.api.exceptions.*;
import com.ecommerce.api.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

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

        validateOrder(newOrderDto);
        ShoppingCart userShoppingCart = shoppingCartRepository.findByUserId(userId);

        final var shortCardNumber = String.valueOf(newOrderDto.getCardNumber()).substring(String.valueOf(newOrderDto.getCardNumber()).length()-3);

        newOrderDto.setCardNumber(shortCardNumber);
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
        if(newOrderDto.getAddress1() == null){
            throw new InvalidAddressException();
        }
        if(newOrderDto.getCity() == null){
            throw new InvalidCityException();
        }
        if(newOrderDto.getProvince() == null){
            throw new InvalidProvinceException();
        }
        if(newOrderDto.getZipCode().toString().length() != 5){
            throw new InvalidZipCodeException();
        }
        if(newOrderDto.getCardHolderName() == null){
            throw new InvalidCardHolderNameException();
        }
        if(!validDate(newOrderDto.getExpirationDate())){
            throw new InvalidExpirationDateException();
        }
        if(newOrderDto.getCvv().toString().length() != 3){
            throw new InvalidCvvException();
        }
    }

    public static boolean validateCreditCard(String cardNumber) {
        String cleanedNumber = cardNumber.replaceAll("\\D", "");

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

    public static boolean validDate(String expirationDate) {
        if (!expirationDate.matches("^\\d{2}/\\d{2}$")) {
            return false;
        }

        String[] parts = expirationDate.split("/");
        int month;
        int year;
        try {
            month = Integer.parseInt(parts[0]);
            year = Integer.parseInt(parts[1]);
        } catch (NumberFormatException e) {
            return false;
        }

        LocalDate currentDate = LocalDate.now();
        int currentYear = currentDate.getYear() % 100;
        int currentMonth = currentDate.getMonthValue();

        return (year > currentYear && month >= 1 && month <= 12) ||
                (year == currentYear && month > currentMonth && month <= 12);
    }
}

