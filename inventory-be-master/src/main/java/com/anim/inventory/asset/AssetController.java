package com.anim.inventory.asset;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/assets")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping()
    public ResponseEntity<Asset> add(@RequestBody Asset asset) {
        return assetService.save(asset);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(assetService.count());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asset> finById(@PathVariable Long id) {
        return assetService.findById(id);
    }

    @GetMapping
    public ResponseEntity<List<Asset>> findAll() {
        return assetService.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return assetService.deleteById(id);
    }
}
