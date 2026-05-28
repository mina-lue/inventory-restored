package com.anim.inventory.store;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/balance")
public class BalanceController {

    private final BalanceService balanceService;

    public BalanceController(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    @GetMapping()
    public ResponseEntity<InventoryBalance> getBalance() {
        return balanceService.get();
    }

    @PostMapping()
    public ResponseEntity<InventoryBalance> initialize(@RequestBody InventoryBalance balance) {
        return balanceService.initialize(balance);
    }

    @PostMapping("/reset")
    public ResponseEntity<InventoryBalance> reset(@RequestBody InventoryBalance balance) {
        return balanceService.reset(balance);
    }
}
