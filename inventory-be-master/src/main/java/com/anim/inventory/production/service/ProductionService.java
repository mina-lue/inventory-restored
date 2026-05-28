package com.anim.inventory.production.service;

import com.anim.inventory.material.Material;
import com.anim.inventory.material.MaterialService;
import com.anim.inventory.production.entity.Consumption;
import com.anim.inventory.production.entity.ProductBomItem;
import com.anim.inventory.product.Product;
import com.anim.inventory.product.ProductService;
import com.anim.inventory.production.entity.Production;
import com.anim.inventory.production.repo.ConsumptionRepository;
import com.anim.inventory.production.repo.ProductBomItemRepository;
import com.anim.inventory.production.repo.ProductionRepository;
import com.anim.inventory.stockmovement.StockMovementService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;

@Component
public class ProductionService {

    private final ProductionRepository productionRepository;
    private final ProductBomItemRepository productBomItemRepository;
    private final ConsumptionRepository consumptionRepository;
    private final ProductService productService;
    private final MaterialService materialService;
    private final StockMovementService stockMovementService;

    public ProductionService(ProductionRepository productionRepository,
                             ProductBomItemRepository productBomItemRepository,
                             ConsumptionRepository consumptionRepository,
                             ProductService productService,
                             MaterialService materialService,
                             StockMovementService stockMovementService) {
        this.productionRepository = productionRepository;
        this.productBomItemRepository = productBomItemRepository;
        this.consumptionRepository = consumptionRepository;
        this.productService = productService;
        this.materialService = materialService;
        this.stockMovementService = stockMovementService;
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

        List<ProductBomItem> bomItems = productBomItemRepository.findByProductId(product.getId());
        for (ProductBomItem bomItem : bomItems) {
            Material material = materialService.findById(bomItem.getMaterial().getId());
            int requiredQuantity = requiredQuantity(production.getQuantity(), bomItem);
            if (safeQuantity(material.getQuantity()) < requiredQuantity) {
                throw new IllegalArgumentException("Insufficient material stock for " + material.getName() + ".");
            }
        }

        if (production.getWastageQuantity() == null) {
            production.setWastageQuantity(0);
        }
        production.setProduct(product);
        Production savedProduction = productionRepository.save(production);

        float productionCost = 0F;
        for (ProductBomItem bomItem : bomItems) {
            Material material = materialService.findById(bomItem.getMaterial().getId());
            int requiredQuantity = requiredQuantity(production.getQuantity(), bomItem);
            int materialQuantityBefore = safeQuantity(material.getQuantity());
            int materialQuantityAfter = materialQuantityBefore - requiredQuantity;

            material.setQuantity(materialQuantityAfter);
            materialService.updateInventory(material);

            Consumption consumption = new Consumption();
            consumption.setProduction(savedProduction);
            consumption.setMaterial(material);
            consumption.setQuantity(requiredQuantity);
            consumptionRepository.save(consumption);

            productionCost += requiredQuantity * safePrice(material.getCostPrice(), material.getPrice());
            stockMovementService.record("material", material.getId(), "production_consumption", materialQuantityBefore, materialQuantityAfter, savedProduction.getId(), "Material consumed for production");
        }

        int quantityBefore = safeQuantity(product.getQuantity());
        int quantityAfter = quantityBefore + production.getQuantity();

        product.setQuantity(quantityAfter);
        productService.updateInventory(product);
        savedProduction.setProductionCost(productionCost);
        productionRepository.save(savedProduction);
        stockMovementService.record("product", product.getId(), "production", quantityBefore, quantityAfter, savedProduction.getId(), "Product produced");
        return savedProduction;
    }

    private int requiredQuantity(Integer productionQuantity, ProductBomItem bomItem) {
        float wastageMultiplier = 1F + safePercent(bomItem.getWastagePercent());
        return (int) Math.ceil(productionQuantity * bomItem.getQuantityPerUnit() * wastageMultiplier);
    }

    private float safePercent(Float percent) {
        return percent == null ? 0F : percent / 100F;
    }

    private float safePrice(Float costPrice, Float fallbackPrice) {
        if (costPrice != null) {
            return costPrice;
        }
        return fallbackPrice == null ? 0F : fallbackPrice;
    }

    private int safeQuantity(Integer quantity) {
        return quantity == null ? 0 : quantity;
    }


}
