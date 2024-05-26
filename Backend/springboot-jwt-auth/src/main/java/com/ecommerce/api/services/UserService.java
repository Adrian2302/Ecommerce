package com.ecommerce.api.services;

import com.ecommerce.api.dtos.RegisterUserDto;
import com.ecommerce.api.entities.*;
import com.ecommerce.api.repositories.RoleRepository;
import com.ecommerce.api.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public User createAdministrator(RegisterUserDto input) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);

        if (optionalRole.isEmpty()) {
            return null;
        }

        var user = new User()
                .setFullName(input.getFullName())
                .setEmail(input.getEmail())
                .setPassword(passwordEncoder.encode(input.getPassword()))
                .setRole(optionalRole.get());

        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setUser(user);
        user.setShoppingCart(shoppingCart);

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        user.setWishlist(wishlist);

        return userRepository.save(user);
    }
}