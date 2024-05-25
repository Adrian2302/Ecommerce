package com.ecommerce.api.repositories;

import com.ecommerce.api.entities.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
//    void deleteById(Long id);
}
