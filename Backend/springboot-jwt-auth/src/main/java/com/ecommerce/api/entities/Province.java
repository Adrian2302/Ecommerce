//package com.ecommerce.api.entities;
//
//import com.ecommerce.api.dtos.OrdersDto;
//import com.ecommerce.api.dtos.ProvinceDto;
//import jakarta.persistence.*;
//import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.annotations.UpdateTimestamp;
//
//import java.util.Date;
//
//@Table(name = "roles")
//@Entity
//public class Province {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(nullable = false)
//    private Long id;
//    @Column(unique = true, nullable = false)
//    private String name;
//
//    public Province(){
//    }
//
//    public Province(ProvinceDto provinceDto){
//        this.id = provinceDto.getId();
//        this.name = provinceDto.getName();
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//}
//
