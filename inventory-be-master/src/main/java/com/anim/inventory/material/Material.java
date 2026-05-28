package com.anim.inventory.material;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Material {
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
    private Float price;
    private Integer quantity;
    private Integer reorderPoint;
    private String location;
    private Boolean active;
}
