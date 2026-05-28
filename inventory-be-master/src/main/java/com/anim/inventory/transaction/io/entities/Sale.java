package com.anim.inventory.transaction.io.entities;

import com.anim.inventory.customer.Customer;
import com.anim.inventory.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;
    private Float totalPrice;
    private LocalDateTime saleDate;
    private Integer quantity;
    private Boolean taxed;
    private String fsn;

    @ManyToOne
    private Customer consumer;


    @PrePersist
    protected void onCreate() {
        this.saleDate = LocalDateTime.now();
    }
}
