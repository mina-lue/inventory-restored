package com.anim.inventory.material;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class MaterialService {
    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public List<Material> findAll() {
        return materialRepository.findAll();
    }

    public Material findById(Long id) {
        Optional<Material> material = materialRepository.findById(id);
        return material.orElse(null);
    }

    public ResponseEntity<Material> save(Material material) {
        material.setQuantity(0);
        return new ResponseEntity<>(materialRepository.save(material), HttpStatus.CREATED);
    }

    public Material updateInventory(Material material) {
        return materialRepository.save(material);
    }

    public ResponseEntity<Void> deleteById(Long id) {
        if (materialRepository.findById(id).isPresent()) {
            materialRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
