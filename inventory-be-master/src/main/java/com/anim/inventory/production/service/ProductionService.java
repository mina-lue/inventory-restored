package com.anim.inventory.production.service;

import com.anim.inventory.product.Product;
import com.anim.inventory.product.ProductService;
import com.anim.inventory.production.entity.Production;
import com.anim.inventory.production.repo.ProductionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;

@Component
public class ProductionService {

    private final ProductionRepository productionRepository;
    private final ProductService productService;

    public ProductionService(ProductionRepository productionRepository, ProductService productService) {
        this.productionRepository = productionRepository;
        this.productService = productService;
    }

    public List<Production> findAll() {
        return productionRepository.findAll();
    }

    @Transactional
    public Production save(Production production) {
        if (production.getProduct() == null || production.getProduct().getId() == null) {
            throw new IllegalArgumentException("Product is required for production.");
        }
        if (production.getQuantity() == null || production.getQuantity() <= 0) {
            throw new IllegalArgumentException("Production quantity must be greater than zero.");
        }

        Product product = productService.findById(production.getProduct().getId());
        if (product == null) {
            throw new NoSuchElementException("Product not found.");
        }

        product.setQuantity(product.getQuantity() + production.getQuantity());
        productService.updateInventory(product);
        production.setProduct(product);
        return productionRepository.save(production);
    }


}
