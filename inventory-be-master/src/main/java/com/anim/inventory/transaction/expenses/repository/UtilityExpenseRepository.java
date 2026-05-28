package com.anim.inventory.transaction.expenses.repository;

import com.anim.inventory.transaction.expenses.entity.UtilityExpense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface UtilityExpenseRepository extends JpaRepository<UtilityExpense, Long> {
    List<UtilityExpense> findByExpenseDateBetween(LocalDateTime start, LocalDateTime end);
}
