package com.anim.inventory.transaction.expenses.repository;

import com.anim.inventory.transaction.expenses.entity.OtherExpenses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OtherExpensesRepository extends JpaRepository<OtherExpenses, Long> {
    List<OtherExpenses> findByExpenseDateBetween(LocalDateTime start, LocalDateTime end);
}
