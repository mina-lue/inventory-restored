package com.anim.inventory.transaction.io.repository;

import com.anim.inventory.transaction.io.entities.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface PurchaseRespository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByPurchaseDateBetween(LocalDateTime start, LocalDateTime end);
}
