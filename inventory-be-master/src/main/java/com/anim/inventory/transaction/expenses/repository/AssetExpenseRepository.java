package com.anim.inventory.transaction.expenses.repository;

import com.anim.inventory.transaction.expenses.entity.AssetExpense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AssetExpenseRepository extends JpaRepository<AssetExpense, Long> {
    List<AssetExpense> findByExpenseDateBetween(LocalDateTime start, LocalDateTime end);
}
