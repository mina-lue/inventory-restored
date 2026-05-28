package com.anim.inventory.transaction.expenses.entity;

import com.anim.inventory.asset.Asset;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AssetExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Asset asset;
    private String description;
    private Float amount;
    private LocalDateTime expenseDate;

    @PrePersist
    protected void onCreate() {
        expenseDate = LocalDateTime.now();
    }
}
