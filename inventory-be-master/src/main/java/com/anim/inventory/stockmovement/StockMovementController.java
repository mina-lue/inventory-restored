package com.anim.inventory.stockmovement;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/stock-movements")
public class StockMovementController {
    private final StockMovementService stockMovementService;

    public StockMovementController(StockMovementService stockMovementService) {
        this.stockMovementService = stockMovementService;
    }

    @GetMapping
    public ResponseEntity<List<StockMovement>> findAll(@RequestParam(required = false) String itemType,
                                                       @RequestParam(required = false) Long itemId) {
        if (itemType != null && itemId != null) {
            return ResponseEntity.ok(stockMovementService.findByItem(itemType, itemId));
        }
        return ResponseEntity.ok(stockMovementService.findAll());
    }
}
