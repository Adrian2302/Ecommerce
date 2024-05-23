package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.ShoppingCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Long> {
    void deleteById(Long id);
    ShoppingCartItem findByProductId(Long productId);
}
