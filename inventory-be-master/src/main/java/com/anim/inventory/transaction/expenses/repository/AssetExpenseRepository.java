package com.anim.inventory.transaction.expenses.repository;

import com.anim.inventory.transaction.expenses.entity.AssetExpense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetExpenseRepository extends JpaRepository<AssetExpense, Long> {
}
