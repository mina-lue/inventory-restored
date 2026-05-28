package com.anim.inventory.material;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.anim.inventory.store.ReorderSuggestion;

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

    public List<Material> getLowStockMaterials() {
        return materialRepository.findAll().stream()
                .filter(material -> material.getActive() == null || material.getActive())
                .filter(material -> material.getReorderPoint() != null && material.getReorderPoint() > 0)
                .filter(material -> safeQuantity(material.getQuantity()) <= material.getReorderPoint())
                .collect(Collectors.toList());
    }

    public List<ReorderSuggestion> getReorderSuggestions() {
        return getLowStockMaterials().stream()
                .map(material -> new ReorderSuggestion(
                        "material",
                        material.getId(),
                        material.getName(),
                        material.getSku(),
                        material.getSupplier(),
                        material.getUnit(),
                        safeQuantity(material.getQuantity()),
                        material.getReorderPoint(),
                        material.getReorderPoint() - safeQuantity(material.getQuantity())
                ))
                .collect(Collectors.toList());
    }

    public ResponseEntity<Material> save(Material material) {
        if (material.getQuantity() == null) {
            material.setQuantity(0);
        }
        if (material.getReorderPoint() == null) {
            material.setReorderPoint(0);
        }
        if (material.getActive() == null) {
            material.setActive(true);
        }
        if (material.getCostPrice() == null) {
            material.setCostPrice(material.getPrice());
        }
        return new ResponseEntity<>(materialRepository.save(material), HttpStatus.CREATED);
    }

    public ResponseEntity<Material> update(Long id, Material material) {
        if (!materialRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        material.setId(id);
        if (material.getQuantity() == null) {
            material.setQuantity(0);
        }
        if (material.getReorderPoint() == null) {
            material.setReorderPoint(0);
        }
        if (material.getActive() == null) {
            material.setActive(true);
        }
        if (material.getCostPrice() == null) {
            material.setCostPrice(material.getPrice());
        }
        return new ResponseEntity<>(materialRepository.save(material), HttpStatus.OK);
    }

    public Material updateInventory(Material material) {
        return materialRepository.save(material);
    }

    private int safeQuantity(Integer quantity) {
        return quantity == null ? 0 : quantity;
    }

    public ResponseEntity<Void> deleteById(Long id) {
        if (materialRepository.findById(id).isPresent()) {
            materialRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
