package com.anim.inventory.transaction.expenses.repository;

import com.anim.inventory.transaction.expenses.entity.LabourExpense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface LabourExpenseRepository extends JpaRepository<LabourExpense, Long> {
    List<LabourExpense> findByExpenseDateBetween(LocalDateTime start, LocalDateTime end);
}
