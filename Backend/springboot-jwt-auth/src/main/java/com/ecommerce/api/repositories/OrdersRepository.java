package com.ecommerce.api.repositories;

import com.ecommerce.api.dtos.OrdersDto;
import com.ecommerce.api.entities.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByUserId(Integer userId);
}
