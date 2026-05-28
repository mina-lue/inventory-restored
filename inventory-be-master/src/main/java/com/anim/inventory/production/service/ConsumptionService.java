package com.anim.inventory.production.service;

import com.anim.inventory.material.Material;
import com.anim.inventory.material.MaterialService;
import com.anim.inventory.production.entity.Consumption;
import com.anim.inventory.production.repo.ConsumptionRepository;
import com.anim.inventory.stockmovement.StockMovementService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;


import java.util.List;
import java.util.NoSuchElementException;

@Component
public class ConsumptionService {

    private final ConsumptionRepository consumptionRepository;
    private final MaterialService materialService;
    private final StockMovementService stockMovementService;

    public ConsumptionService(ConsumptionRepository consumptionRepository, MaterialService materialService, StockMovementService stockMovementService) {
        this.consumptionRepository = consumptionRepository;
        this.materialService = materialService;
        this.stockMovementService = stockMovementService;
    }

    public List<Consumption> findAll() {
        return consumptionRepository.findAll();
    }

    @Transactional
    public Consumption save(Consumption consumption) {
        if (consumption.getMaterial() == null || consumption.getMaterial().getId() == null) {
            throw new IllegalArgumentException("Material is required for consumption.");
        }
        if (consumption.getQuantity() == null || consumption.getQuantity() <= 0) {
            throw new IllegalArgumentException("Consumption quantity must be greater than zero.");
        }

        Material material = materialService.findById(consumption.getMaterial().getId());
        if (material == null) {
            throw new NoSuchElementException("Material not found.");
        }
        int quantityBefore = safeQuantity(material.getQuantity());

        if (quantityBefore < consumption.getQuantity()) {
            throw new IllegalArgumentException("Consumption quantity exceeds available material stock.");
        }

        int quantityAfter = quantityBefore - consumption.getQuantity();
        material.setQuantity(quantityAfter);
        materialService.updateInventory(material);
        consumption.setMaterial(material);

        Consumption savedConsumption = consumptionRepository.save(consumption);
        stockMovementService.record("material", material.getId(), "consumption", quantityBefore, quantityAfter, savedConsumption.getId(), "Material consumed");
        return savedConsumption;
    }

    private int safeQuantity(Integer quantity) {
        return quantity == null ? 0 : quantity;
    }

}
