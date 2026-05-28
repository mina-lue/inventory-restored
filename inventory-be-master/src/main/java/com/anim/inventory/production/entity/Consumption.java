package com.anim.inventory.production.entity;

import com.anim.inventory.material.Material;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Consumption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Material material;
    @ManyToOne
    private Production production;
    private Integer quantity;
    private LocalDateTime consumptionDate;

    @PrePersist
    protected void onCreate() {
        if (consumptionDate == null) {
            consumptionDate = LocalDateTime.now();
        }
    }
}
