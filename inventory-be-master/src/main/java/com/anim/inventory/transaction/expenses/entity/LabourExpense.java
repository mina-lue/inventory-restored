package com.anim.inventory.transaction.expenses.entity;

import com.anim.inventory.asset.Asset;
import jakarta.persistence.*;
        import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LabourExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String laborerName;
    private String description;
    private Float amount;
}