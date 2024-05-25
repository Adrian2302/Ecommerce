package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.dtos.OrdersDto;
import com.tericcabrel.authapi.dtos.OrdersItemDto;
import com.tericcabrel.authapi.entities.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<OrdersDto> findByUserId(Integer userId);
}
