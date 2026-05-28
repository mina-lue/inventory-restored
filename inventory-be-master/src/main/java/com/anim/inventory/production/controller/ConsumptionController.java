package com.anim.inventory.production.controller;

import com.anim.inventory.production.entity.Consumption;
import com.anim.inventory.production.service.ConsumptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/v1/consumption")
public class ConsumptionController {
    private final ConsumptionService consumptionService;

    public ConsumptionController(ConsumptionService consumptionService) {
        this.consumptionService = consumptionService;
    }

    @GetMapping
    public ResponseEntity<List<Consumption>> findAll() {
        List<Consumption> consumptions = consumptionService.findAll();
        return ResponseEntity.ok(consumptions);
    }

    @PostMapping
    public ResponseEntity<Consumption> save(@RequestBody Consumption consumption) {
        try {
            Consumption consumptionSaved = consumptionService.save(consumption);
            return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().build().toUri()).body(consumptionSaved);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
