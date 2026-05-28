package com.anim.inventory.production.service;

import com.anim.inventory.material.Material;
import com.anim.inventory.material.MaterialService;
import com.anim.inventory.production.entity.Consumption;
import com.anim.inventory.production.repo.ConsumptionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;


import java.util.List;
import java.util.NoSuchElementException;

@Component
public class ConsumptionService {

    private final ConsumptionRepository consumptionRepository;
    private final MaterialService materialService;

    public ConsumptionService(ConsumptionRepository consumptionRepository, MaterialService materialService) {
        this.consumptionRepository = consumptionRepository;
        this.materialService = materialService;
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
        if (material.getQuantity() < consumption.getQuantity()) {
            throw new IllegalArgumentException("Consumption quantity exceeds available material stock.");
        }

        material.setQuantity(material.getQuantity() - consumption.getQuantity());
        materialService.updateInventory(material);
        consumption.setMaterial(material);

        return consumptionRepository.save(consumption);
    }

}
