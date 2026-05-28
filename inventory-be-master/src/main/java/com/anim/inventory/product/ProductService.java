package com.anim.inventory.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findTopBySoldQuantity(Pageable pageable) {
        Page<Product> pages = productRepository.findAll(pageable);
        List<Product> products = pages.getContent();
        if (products.isEmpty()) {
            return new ArrayList<>();
        }
        return products;
    }

    public List<Product> getAgedProducts() {
        Pageable pageable = PageRequest.of(0, 4, Sort.by("lastSoldTime").descending());
        Page<Product> pageProducts = productRepository.findByOrderByLastSoldTime(pageable);
        List<Product> products = pageProducts.getContent();
        if (products.isEmpty()) {
            return new ArrayList<>();
        }
        return products;
    }

    public Product findById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    public ResponseEntity<Product> save(Product product) {
        if (product.getQuantity() == null) {
            product.setQuantity(0);
        }
        if (product.getSoldQuantity() == null) {
            product.setSoldQuantity(0);
        }
        if (product.getReorderPoint() == null) {
            product.setReorderPoint(0);
        }
        if (product.getActive() == null) {
            product.setActive(true);
        }
        if (product.getSellingPrice() == null) {
            product.setSellingPrice(product.getPrice());
        }
        if (product.getPrice() == null) {
            product.setPrice(product.getSellingPrice());
        }
        return new ResponseEntity<>(productRepository.save(product), HttpStatus.CREATED);
    }

    public Product updateInventory(Product product) {
        return productRepository.save(product);
    }

    public ResponseEntity<Void> deleteById(Long id) {
        if (productRepository.findById(id).isPresent()) {
            productRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
