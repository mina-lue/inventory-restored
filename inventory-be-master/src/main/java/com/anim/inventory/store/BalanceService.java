package com.anim.inventory.store;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class BalanceService {
    private final BalanceRepository balanceRepository;

    private BalanceService(BalanceRepository balanceRepository) {
        this.balanceRepository = balanceRepository;
    }

    public ResponseEntity<InventoryBalance> initialize(InventoryBalance inventoryBalance) {
        if(balanceRepository.existsById(1L)) {
            return ResponseEntity.badRequest().build();
        }
        balanceRepository.save(inventoryBalance);
        return ResponseEntity.ok().body(inventoryBalance);
    }

    public ResponseEntity<InventoryBalance> reset(InventoryBalance inventoryBalance) {
        if(balanceRepository.existsById(1L)) {
            InventoryBalance existingInventoryBalance = balanceRepository.findById(1L).orElse(new InventoryBalance());
            existingInventoryBalance.setWorth(inventoryBalance.getWorth());
            existingInventoryBalance.setCapital(inventoryBalance.getCapital());
            InventoryBalance savedInventoryBalance = balanceRepository.save(existingInventoryBalance);
            return ResponseEntity.ok().body(savedInventoryBalance);
        }
        InventoryBalance savedInventoryBalance = balanceRepository.save(inventoryBalance);
        return ResponseEntity.ok().body(savedInventoryBalance);
    }

    public ResponseEntity<InventoryBalance> get() {
        if(balanceRepository.existsById(1L)) {
            return ResponseEntity.ok().body(balanceRepository.findById(1L).orElse(new InventoryBalance()));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<InventoryBalance> changeBalance(Float value) {
        if(balanceRepository.existsById(1L)) {
            InventoryBalance existingInventoryBalance = balanceRepository.findById(1L).orElse(new InventoryBalance());
            existingInventoryBalance.setCapital(existingInventoryBalance.getCapital() + value);
            existingInventoryBalance.setWorth(existingInventoryBalance.getWorth() + value);
            InventoryBalance savedInventoryBalance = balanceRepository.save(existingInventoryBalance);
            return ResponseEntity.ok().body(savedInventoryBalance);
        }
        return ResponseEntity.notFound().build();
    }
}
