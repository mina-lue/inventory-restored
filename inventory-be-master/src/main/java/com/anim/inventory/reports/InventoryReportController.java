package com.anim.inventory.reports;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/reports")
public class InventoryReportController {
    private final InventoryReportService inventoryReportService;

    public InventoryReportController(InventoryReportService inventoryReportService) {
        this.inventoryReportService = inventoryReportService;
    }

    @GetMapping("/inventory-valuation")
    public ResponseEntity<Map<String, Object>> inventoryValuation() {
        return ResponseEntity.ok(inventoryReportService.inventoryValuation());
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Map<String, Object>>> lowStockItems() {
        return ResponseEntity.ok(inventoryReportService.lowStockItems());
    }

    @GetMapping("/profit-by-product")
    public ResponseEntity<List<Map<String, Object>>> profitByProduct() {
        return ResponseEntity.ok(inventoryReportService.profitByProduct());
    }

    @GetMapping("/sales")
    public ResponseEntity<List<Map<String, Object>>> salesReport() {
        return ResponseEntity.ok(inventoryReportService.salesReport());
    }

    @GetMapping("/material-consumption")
    public ResponseEntity<List<Map<String, Object>>> materialConsumptionReport() {
        return ResponseEntity.ok(inventoryReportService.materialConsumptionReport());
    }

    @GetMapping("/expense-breakdown")
    public ResponseEntity<List<Map<String, Object>>> expenseBreakdown() {
        return ResponseEntity.ok(inventoryReportService.expenseBreakdown());
    }

    @GetMapping("/stock-movements")
    public ResponseEntity<List<?>> stockMovements() {
        return ResponseEntity.ok(inventoryReportService.stockMovementHistory());
    }
}
