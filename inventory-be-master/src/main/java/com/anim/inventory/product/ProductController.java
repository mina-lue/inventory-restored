package com.anim.inventory.product;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

import com.anim.inventory.store.ReorderSuggestion;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {
    private final ProductService productService;


    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping()
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return productService.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.update(id, product);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(productService.count());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> finById(@PathVariable Long id) {
        if(productService.findById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/aged")
    public ResponseEntity<List<Product>> findAged() {
        List<Product> agedProducts = productService.getAgedProducts();
        if(agedProducts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(agedProducts, HttpStatus.OK);
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Product>> findLowStock() {
        return ResponseEntity.ok(productService.getLowStockProducts());
    }

    @GetMapping("/reorder-suggestions")
    public ResponseEntity<List<ReorderSuggestion>> findReorderSuggestions() {
        return ResponseEntity.ok(productService.getReorderSuggestions());
    }

    @GetMapping()
    public ResponseEntity<List<Product>> findTopBySoldQuantity(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "soldQuantity") String sortBy
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        List<Product> products = productService.findTopBySoldQuantity(pageable);
        if(products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productService.deleteById(id);
    }
}
