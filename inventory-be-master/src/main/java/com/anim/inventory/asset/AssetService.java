package com.anim.inventory.asset;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AssetService {
    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public ResponseEntity<List<Asset>> findAll() {
        if (assetRepository.findAll().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(assetRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<Asset> findById(Long id) {
        if (assetRepository.findById(id).isPresent()) {
            return ResponseEntity.ok(assetRepository.findById(id).get());
        }
        return ResponseEntity.notFound().build();
    }

    public long count() {
        return assetRepository.count();
    }

    public ResponseEntity<Asset> save(Asset asset) {
        return new ResponseEntity<>(assetRepository.save(asset), HttpStatus.CREATED);
    }

    public ResponseEntity<Asset> update(Long id, Asset asset) {
        if (!assetRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        asset.setId(id);
        return new ResponseEntity<>(assetRepository.save(asset), HttpStatus.OK);
    }

    public ResponseEntity<Void> deleteById(Long id) {
        if (assetRepository.findById(id).isPresent()) {
            assetRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
