package com.anim.inventory.production.controller;

import com.anim.inventory.production.entity.Production;
import com.anim.inventory.production.service.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("api/v1/productions")
public class ProductionController {

    private final ProductionService productionService;

    public ProductionController(ProductionService productionService) {
        this.productionService = productionService;
    }

    @GetMapping
    public ResponseEntity<List<Production>> getProductions() {
        List<Production> productions = productionService.findAll();
        return ResponseEntity.ok(productions);
    }

    @PostMapping
    public ResponseEntity<Production> createProduction(@RequestBody Production production) {
        Production p = productionService.save(production);
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentContextPath().build().toUri()).body(p);
    }
}
