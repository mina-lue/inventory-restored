package com.anim.inventory.production.controller;

import com.anim.inventory.production.entity.ProductBomItem;
import com.anim.inventory.production.service.ProductBomItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("api/v1/boms")
public class ProductBomItemController {
    private final ProductBomItemService productBomItemService;

    public ProductBomItemController(ProductBomItemService productBomItemService) {
        this.productBomItemService = productBomItemService;
    }

    @GetMapping
    public ResponseEntity<List<ProductBomItem>> findAll() {
        return ResponseEntity.ok(productBomItemService.findAll());
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductBomItem>> findByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(productBomItemService.findByProductId(productId));
    }

    @PostMapping
    public ResponseEntity<ProductBomItem> save(@RequestBody ProductBomItem bomItem) {
        ProductBomItem savedBomItem = productBomItemService.save(bomItem);
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().build().toUri()).body(savedBomItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productBomItemService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
