package com.anim.inventory.store;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceRepository extends JpaRepository<InventoryBalance, Long> {
}
