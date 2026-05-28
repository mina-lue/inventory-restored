package com.anim.inventory.transaction.expenses.repository;

import com.anim.inventory.transaction.expenses.entity.LabourExpense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabourExpenseRepository extends JpaRepository<LabourExpense, Long> {
}
