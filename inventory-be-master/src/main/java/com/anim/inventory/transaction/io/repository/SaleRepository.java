package com.anim.inventory.transaction.io.repository;

import com.anim.inventory.product.Product;
import com.anim.inventory.transaction.io.entities.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    Page<Sale> findAll(Pageable pageable);
}
