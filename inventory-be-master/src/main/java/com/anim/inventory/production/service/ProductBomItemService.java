package com.anim.inventory.production.service;

import com.anim.inventory.material.Material;
import com.anim.inventory.material.MaterialService;
import com.anim.inventory.product.Product;
import com.anim.inventory.product.ProductService;
import com.anim.inventory.production.entity.ProductBomItem;
import com.anim.inventory.production.repo.ProductBomItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProductBomItemService {
    private final ProductBomItemRepository productBomItemRepository;
    private final ProductService productService;
    private final MaterialService materialService;

    public ProductBomItemService(ProductBomItemRepository productBomItemRepository,
                                 ProductService productService,
                                 MaterialService materialService) {
        this.productBomItemRepository = productBomItemRepository;
        this.productService = productService;
        this.materialService = materialService;
    }

    public List<ProductBomItem> findAll() {
        return productBomItemRepository.findAll();
    }

    public List<ProductBomItem> findByProductId(Long productId) {
        return productBomItemRepository.findByProductId(productId);
    }

    public ProductBomItem save(ProductBomItem bomItem) {
        if (bomItem.getProduct() == null || bomItem.getProduct().getId() == null) {
            throw new IllegalArgumentException("Product is required for a BOM item.");
        }
        if (bomItem.getMaterial() == null || bomItem.getMaterial().getId() == null) {
            throw new IllegalArgumentException("Material is required for a BOM item.");
        }
        if (bomItem.getQuantityPerUnit() == null || bomItem.getQuantityPerUnit() <= 0) {
            throw new IllegalArgumentException("Quantity per unit must be greater than zero.");
        }

        Product product = productService.findById(bomItem.getProduct().getId());
        if (product == null) {
            throw new NoSuchElementException("Product not found.");
        }

        Material material = materialService.findById(bomItem.getMaterial().getId());
        if (material == null) {
            throw new NoSuchElementException("Material not found.");
        }

        if (bomItem.getWastagePercent() == null) {
            bomItem.setWastagePercent(0F);
        }
        bomItem.setProduct(product);
        bomItem.setMaterial(material);
        return productBomItemRepository.save(bomItem);
    }

    public void deleteById(Long id) {
        productBomItemRepository.deleteById(id);
    }
}
