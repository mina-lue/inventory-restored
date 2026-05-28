package com.anim.inventory.stockmovement;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemType;
    private Long itemId;
    private String movementType;
    private Integer quantityBefore;
    private Integer quantityAfter;
    private Integer quantityChanged;
    private Long referenceTransactionId;
    private String createdBy;
    private LocalDateTime createdAt;
    private String note;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (createdBy == null || createdBy.isBlank()) {
            createdBy = "system";
        }
    }
}
