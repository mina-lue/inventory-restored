package com.anim.inventory.production.entity;

import com.anim.inventory.product.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Production {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;
    private Integer quantity;
    private String batchNumber;
    private Integer wastageQuantity;
    private Float productionCost;
    private String responsibleEmployee;
    private String note;
    private LocalDateTime productionDate;

    @PrePersist
    public void prePersist() {
        productionDate = LocalDateTime.now();
    }
}
