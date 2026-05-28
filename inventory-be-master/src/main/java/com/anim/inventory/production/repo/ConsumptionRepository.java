package com.anim.inventory.production.repo;

import com.anim.inventory.production.entity.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumptionRepository extends JpaRepository<Consumption, Long> {
}
