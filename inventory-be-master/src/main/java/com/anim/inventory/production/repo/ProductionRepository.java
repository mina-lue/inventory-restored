package com.anim.inventory.production.repo;

import com.anim.inventory.production.entity.Production;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionRepository extends JpaRepository<Production, Long> {
}
