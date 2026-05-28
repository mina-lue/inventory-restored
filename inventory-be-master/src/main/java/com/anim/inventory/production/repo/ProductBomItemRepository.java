package com.anim.inventory.production.repo;

import com.anim.inventory.production.entity.ProductBomItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductBomItemRepository extends JpaRepository<ProductBomItem, Long> {
    List<ProductBomItem> findByProductId(Long productId);
}
