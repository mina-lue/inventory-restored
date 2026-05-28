package com.anim.inventory.stockmovement;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockMovementService {
    private final StockMovementRepository stockMovementRepository;

    public StockMovementService(StockMovementRepository stockMovementRepository) {
        this.stockMovementRepository = stockMovementRepository;
    }

    public List<StockMovement> findAll() {
        return stockMovementRepository.findAll();
    }

    public List<StockMovement> findByItem(String itemType, Long itemId) {
        return stockMovementRepository.findByItemTypeAndItemIdOrderByCreatedAtDesc(itemType, itemId);
    }

    public StockMovement record(String itemType,
                                Long itemId,
                                String movementType,
                                Integer quantityBefore,
                                Integer quantityAfter,
                                Long referenceTransactionId,
                                String note) {
        StockMovement stockMovement = new StockMovement();
        stockMovement.setItemType(itemType);
        stockMovement.setItemId(itemId);
        stockMovement.setMovementType(movementType);
        stockMovement.setQuantityBefore(quantityBefore);
        stockMovement.setQuantityAfter(quantityAfter);
        stockMovement.setQuantityChanged(quantityAfter - quantityBefore);
        stockMovement.setReferenceTransactionId(referenceTransactionId);
        stockMovement.setNote(note);
        return stockMovementRepository.save(stockMovement);
    }
}
