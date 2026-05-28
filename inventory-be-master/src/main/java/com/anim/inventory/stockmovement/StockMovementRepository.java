package com.anim.inventory.stockmovement;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {
    List<StockMovement> findByItemTypeAndItemIdOrderByCreatedAtDesc(String itemType, Long itemId);
}
