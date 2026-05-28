package com.anim.inventory.transaction.io.repository;

import com.anim.inventory.transaction.io.entities.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRespository extends JpaRepository<Purchase, Long> {
}
