package com.anim.inventory.transaction.expenses.repository;

import com.anim.inventory.transaction.expenses.entity.UtilityExpense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilityExpenseRepository extends JpaRepository<UtilityExpense, Long> {
}
