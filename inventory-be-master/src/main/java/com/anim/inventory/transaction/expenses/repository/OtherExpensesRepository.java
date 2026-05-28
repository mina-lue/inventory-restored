package com.anim.inventory.transaction.expenses.repository;

import com.anim.inventory.transaction.expenses.entity.OtherExpenses;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtherExpensesRepository extends JpaRepository<OtherExpenses, Long> {
}
