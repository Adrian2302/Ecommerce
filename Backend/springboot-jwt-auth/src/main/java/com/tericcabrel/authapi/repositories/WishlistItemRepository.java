package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
//    void deleteById(Long id);
}
