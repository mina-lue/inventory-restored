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
    private LocalDateTime ProductionDate;

    @PrePersist
    public void prePersist() {
        ProductionDate = LocalDateTime.now();
    }
}
