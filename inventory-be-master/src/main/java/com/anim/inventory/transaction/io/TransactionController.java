package com.anim.inventory.transaction.io;

import com.anim.inventory.material.Material;
import com.anim.inventory.material.MaterialService;
import com.anim.inventory.product.Product;
import com.anim.inventory.product.ProductService;
import com.anim.inventory.store.BalanceService;
import com.anim.inventory.transaction.io.entities.Purchase;
import com.anim.inventory.transaction.io.entities.Sale;
import com.anim.inventory.transaction.io.repository.PurchaseRespository;
import com.anim.inventory.transaction.io.repository.SaleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {

    private final BalanceService balanceService;
    private final MaterialService materialService;
    private final SaleRepository saleRepository;
    private final PurchaseRespository purchaseRespository;
    private final TransactionsService transactionsService;

    public TransactionController(BalanceService balanceService, MaterialService materialService, SaleRepository saleRepository, PurchaseRespository purchaseRespository, TransactionsService transactionsService) {
        this.balanceService = balanceService;
        this.materialService = materialService;
        this.saleRepository = saleRepository;
        this.purchaseRespository = purchaseRespository;
        this.transactionsService = transactionsService;
    }

    @PostMapping("/sales")
    public ResponseEntity<Sale> Sell(@RequestBody Sale sale) {
        try {
            Sale saleSaved = transactionsService.saveSale(sale);
            return ResponseEntity.created(URI.create("/sales/")).body(saleSaved);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/materials")
    public ResponseEntity<Purchase> BuyMaterial(@RequestBody Purchase purchase) {
        try {
            Purchase purchaseSaved = transactionsService.savePurchase(purchase);
            return ResponseEntity.created(URI.create("/materils/")).body(purchaseSaved);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Delete and update to be implemented

    @GetMapping("/sales")
    public ResponseEntity<List<Sale>> getSales(){
        return ResponseEntity.ok(saleRepository.findAll());
    }

    @GetMapping("/materials")
    public ResponseEntity<List<Purchase>> getPurchases(){
        return ResponseEntity.ok(purchaseRespository.findAll());
    }

// total money ins and outs

    @GetMapping("/money-in")
    public ResponseEntity<Double> getMoneyIn(){
        return ResponseEntity.ok(transactionsService.getAllInMoney());
    }

    @GetMapping("/money-out")
    public ResponseEntity<Double> getMoneyOut(){
        return ResponseEntity.ok(transactionsService.getAllOutMoney());
    }

    @GetMapping("recent-sales")
    public ResponseEntity<List<Sale>> getRecentSales(){
        return ResponseEntity.ok(transactionsService.recentSales());
    }

}
