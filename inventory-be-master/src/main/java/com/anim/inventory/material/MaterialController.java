package com.anim.inventory.material;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.anim.inventory.store.ReorderSuggestion;

@RestController
@RequestMapping("api/v1/materials")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @PostMapping()
    public ResponseEntity<Material> add(@RequestBody Material material) {
        return materialService.save(material);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> finById(@PathVariable Long id) {
        if (materialService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(materialService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Material>> findAll() {
        List<Material> materials = materialService.findAll();
        if (materials.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(materials);
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Material>> findLowStock() {
        return ResponseEntity.ok(materialService.getLowStockMaterials());
    }

    @GetMapping("/reorder-suggestions")
    public ResponseEntity<List<ReorderSuggestion>> findReorderSuggestions() {
        return ResponseEntity.ok(materialService.getReorderSuggestions());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return materialService.deleteById(id);
    }
}
