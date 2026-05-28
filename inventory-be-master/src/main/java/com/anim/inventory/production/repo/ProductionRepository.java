package com.anim.inventory.production.repo;

import com.anim.inventory.production.entity.Production;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductionRepository extends JpaRepository<Production, Long> {
    List<Production> findByProductionDateBetween(LocalDateTime start, LocalDateTime end);
}
