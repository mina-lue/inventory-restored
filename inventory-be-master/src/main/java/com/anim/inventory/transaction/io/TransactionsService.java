package com.anim.inventory.transaction.io;

import com.anim.inventory.material.Material;
import com.anim.inventory.material.MaterialService;
import com.anim.inventory.product.Product;
import com.anim.inventory.product.ProductService;
import com.anim.inventory.store.BalanceService;
import com.anim.inventory.stockmovement.StockMovementService;
import com.anim.inventory.transaction.expenses.ExpensesService;
import com.anim.inventory.transaction.io.entities.Purchase;
import com.anim.inventory.transaction.io.entities.Sale;
import com.anim.inventory.transaction.io.repository.PurchaseRespository;
import com.anim.inventory.transaction.io.repository.SaleRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TransactionsService {
    private final ExpensesService expensesService;
    private Double totalMoneyIn;
    private Double totalMoneyOut;

    private final SaleRepository saleRepository;
    private final PurchaseRespository purchaseRespository;
    private final ProductService productService;
    private final BalanceService balanceService;
    private final MaterialService materialService;
    private final StockMovementService stockMovementService;

    public TransactionsService(SaleRepository saleRepository, PurchaseRespository purchaseRespository, ProductService productService, BalanceService balanceService, MaterialService materialService, ExpensesService expensesService, StockMovementService stockMovementService) {
        this.saleRepository = saleRepository;
        this.purchaseRespository = purchaseRespository;
        this.productService = productService;
        this.balanceService = balanceService;
        this.materialService = materialService;
        this.expensesService = expensesService;
        this.stockMovementService = stockMovementService;
        totalMoneyOut = 0.0;
        totalMoneyIn = 0.0;
    }

    @Transactional
    public Sale saveSale(Sale sale) {
        if (sale.getProduct() == null || sale.getProduct().getId() == null) {
            throw new IllegalArgumentException("Product is required for a sale.");
        }

        validatePositiveQuantity(sale.getQuantity(), "Sale quantity");
        validatePositiveAmount(sale.getTotalPrice(), "Sale total price");

        Product product = productService.findById(sale.getProduct().getId());
        if(product == null) {
            throw new NoSuchElementException("Product not found.");
        }

        int quantityBefore = safeQuantity(product.getQuantity());

        if (quantityBefore < sale.getQuantity()) {
            throw new IllegalArgumentException("Sale quantity exceeds available product stock.");
        }

        int quantityAfter = quantityBefore - sale.getQuantity();
        product.setQuantity(quantityAfter);
        Float updatePrice = sale.getTotalPrice() / sale.getQuantity();
        product.setPrice(updatePrice);
        product.setSellingPrice(updatePrice);
        product.setSoldQuantity(safeQuantity(product.getSoldQuantity()) + sale.getQuantity());
        product.setLastSoldTime(LocalDateTime.now());
        productService.updateInventory(product);
        balanceService.changeBalance(sale.getTotalPrice());
        sale.setProduct(product);
        Sale savedSale = saleRepository.save(sale);
        stockMovementService.record("product", product.getId(), "sale", quantityBefore, quantityAfter, savedSale.getId(), "Product sold");
        return savedSale;
    }

    @Transactional
    public Purchase savePurchase(Purchase purchase) {
        if (purchase.getMaterial() == null || purchase.getMaterial().getId() == null) {
            throw new IllegalArgumentException("Material is required for a purchase.");
        }

        validatePositiveQuantity(purchase.getQuantity(), "Purchase quantity");
        validatePositiveAmount(purchase.getTotalPrice(), "Purchase total price");

        Material material = materialService.findById(purchase.getMaterial().getId());
        if(material == null) {
            throw new NoSuchElementException("Material not found.");
        }

        int quantityBefore = safeQuantity(material.getQuantity());
        int quantityAfter = quantityBefore + purchase.getQuantity();

        material.setQuantity(quantityAfter);
        Float updatePrice = purchase.getTotalPrice() / purchase.getQuantity();
        material.setPrice(updatePrice);
        material.setCostPrice(updatePrice);
        materialService.updateInventory(material);
        balanceService.changeBalance(-purchase.getTotalPrice());
        purchase.setMaterial(material);
        Purchase savedPurchase = purchaseRespository.save(purchase);
        stockMovementService.record("material", material.getId(), "purchase", quantityBefore, quantityAfter, savedPurchase.getId(), "Material purchased");
        return savedPurchase;
    }


    public Double getAllInMoney(){
        totalMoneyIn = 0.0;
        saleRepository.findAll().forEach(sale -> {
            this.totalMoneyIn += (double)sale.getTotalPrice();
        });
        return this.totalMoneyIn;
    }

    public Double getAllInMoney(String startDate, String endDate){
        totalMoneyIn = 0.0;
        if (startDate != null && endDate != null) {
            LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
            LocalDateTime end = LocalDate.parse(endDate).atTime(LocalTime.MAX);
            saleRepository.findBySaleDateBetween(start, end).forEach(sale -> {
                this.totalMoneyIn += (double) sale.getTotalPrice();
            });
            return this.totalMoneyIn;
        }
        return getAllInMoney();
    }

    @Transactional
    public Double getAllOutMoney(){
        totalMoneyOut = 0.0;
        expensesService.listAssetExpenses().forEach(expense -> {
            this.totalMoneyOut += (double)expense.getAmount();
        });
        expensesService.listUtilityExpenses().forEach(expense -> {
            this.totalMoneyOut += (double)expense.getAmount();
        });
        expensesService.listOtherExpenses().forEach(expense -> {
            this.totalMoneyOut += (double)expense.getAmount();
        });
        purchaseRespository.findAll().forEach(purchase -> {
            this.totalMoneyOut += (double)purchase.getTotalPrice();
        });
        return this.totalMoneyOut;
    }

    @Transactional
    public Double getAllOutMoney(String startDate, String endDate){
        totalMoneyOut = 0.0;
        if (startDate != null && endDate != null) {
            LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
            LocalDateTime end = LocalDate.parse(endDate).atTime(LocalTime.MAX);
            expensesService.listAssetExpenses(startDate, endDate).forEach(expense -> {
                this.totalMoneyOut += (double) expense.getAmount();
            });
            expensesService.listUtilityExpenses(startDate, endDate).forEach(expense -> {
                this.totalMoneyOut += (double) expense.getAmount();
            });
            expensesService.listOtherExpenses(startDate, endDate).forEach(expense -> {
                this.totalMoneyOut += (double) expense.getAmount();
            });
            expensesService.listLabourExpenses(startDate, endDate).forEach(expense -> {
                this.totalMoneyOut += (double) expense.getAmount();
            });
            purchaseRespository.findByPurchaseDateBetween(start, end).forEach(purchase -> {
                this.totalMoneyOut += (double) purchase.getTotalPrice();
            });
            return this.totalMoneyOut;
        }
        return getAllOutMoney();
    }

    public List<Sale> recentSales() {
        Pageable pageable = PageRequest.of(0, 4, Sort.by("saleDate"));
        Page<Sale> pageSales = saleRepository.findAll(pageable);
        List<Sale> sales =pageSales.getContent();
        return sales;
    }

    private void validatePositiveQuantity(Integer quantity, String fieldName) {
        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException(fieldName + " must be greater than zero.");
        }
    }

    private void validatePositiveAmount(Float amount, String fieldName) {
        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException(fieldName + " must be greater than zero.");
        }
    }

    private int safeQuantity(Integer quantity) {
        return quantity == null ? 0 : quantity;
    }
}
