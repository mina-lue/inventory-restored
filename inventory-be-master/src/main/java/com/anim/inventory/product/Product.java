package com.anim.inventory.product;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    @Column(unique = true)
    private String sku;
    @Column(unique = true)
    private String barcode;
    private String category;
    private String supplier;
    private String unit;
    private Float costPrice;
    private Float sellingPrice;
    private Float price;
    private Float taxRate;
    private Integer quantity;
    private Integer soldQuantity;
    private Integer reorderPoint;
    private String location;
    private String batchNumber;
    private String serialNumber;
    private LocalDate expiryDate;
    private Boolean active;
    private LocalDateTime lastSoldTime;
}
