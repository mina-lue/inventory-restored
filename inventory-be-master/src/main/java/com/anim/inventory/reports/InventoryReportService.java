package com.anim.inventory.reports;

import com.anim.inventory.material.Material;
import com.anim.inventory.material.MaterialRepository;
import com.anim.inventory.product.Product;
import com.anim.inventory.product.ProductRepository;
import com.anim.inventory.production.entity.Consumption;
import com.anim.inventory.production.repo.ConsumptionRepository;
import com.anim.inventory.stockmovement.StockMovementRepository;
import com.anim.inventory.transaction.expenses.ExpensesService;
import com.anim.inventory.transaction.io.entities.Sale;
import com.anim.inventory.transaction.io.repository.PurchaseRespository;
import com.anim.inventory.transaction.io.repository.SaleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InventoryReportService {
    private final ProductRepository productRepository;
    private final MaterialRepository materialRepository;
    private final SaleRepository saleRepository;
    private final PurchaseRespository purchaseRespository;
    private final ConsumptionRepository consumptionRepository;
    private final StockMovementRepository stockMovementRepository;
    private final ExpensesService expensesService;

    public InventoryReportService(ProductRepository productRepository,
                                  MaterialRepository materialRepository,
                                  SaleRepository saleRepository,
                                  PurchaseRespository purchaseRespository,
                                  ConsumptionRepository consumptionRepository,
                                  StockMovementRepository stockMovementRepository,
                                  ExpensesService expensesService) {
        this.productRepository = productRepository;
        this.materialRepository = materialRepository;
        this.saleRepository = saleRepository;
        this.purchaseRespository = purchaseRespository;
        this.consumptionRepository = consumptionRepository;
        this.stockMovementRepository = stockMovementRepository;
        this.expensesService = expensesService;
    }

    public Map<String, Object> inventoryValuation() {
        List<Map<String, Object>> rows = new ArrayList<>();
        double productValue = 0D;
        double materialValue = 0D;

        for (Product product : productRepository.findAll()) {
            int quantity = safeQuantity(product.getQuantity());
            double unitValue = safePrice(product.getCostPrice(), product.getPrice());
            double totalValue = quantity * unitValue;
            productValue += totalValue;
            rows.add(valuationRow("product", product.getId(), product.getName(), product.getSku(), quantity, unitValue, totalValue));
        }

        for (Material material : materialRepository.findAll()) {
            int quantity = safeQuantity(material.getQuantity());
            double unitValue = safePrice(material.getCostPrice(), material.getPrice());
            double totalValue = quantity * unitValue;
            materialValue += totalValue;
            rows.add(valuationRow("material", material.getId(), material.getName(), material.getSku(), quantity, unitValue, totalValue));
        }

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("productValue", productValue);
        report.put("materialValue", materialValue);
        report.put("totalValue", productValue + materialValue);
        report.put("items", rows);
        return report;
    }

    public List<Map<String, Object>> lowStockItems() {
        List<Map<String, Object>> rows = new ArrayList<>();
        productRepository.findAll().stream()
                .filter(product -> isLowStock(product.getQuantity(), product.getReorderPoint(), product.getActive()))
                .forEach(product -> rows.add(lowStockRow("product", product.getId(), product.getName(), product.getSku(), product.getSupplier(), product.getUnit(), product.getQuantity(), product.getReorderPoint())));

        materialRepository.findAll().stream()
                .filter(material -> isLowStock(material.getQuantity(), material.getReorderPoint(), material.getActive()))
                .forEach(material -> rows.add(lowStockRow("material", material.getId(), material.getName(), material.getSku(), material.getSupplier(), material.getUnit(), material.getQuantity(), material.getReorderPoint())));

        return rows;
    }

    public List<Map<String, Object>> profitByProduct() {
        Map<Long, List<Sale>> salesByProduct = saleRepository.findAll().stream()
                .filter(sale -> sale.getProduct() != null && sale.getProduct().getId() != null)
                .collect(Collectors.groupingBy(sale -> sale.getProduct().getId()));

        List<Map<String, Object>> rows = new ArrayList<>();
        for (Map.Entry<Long, List<Sale>> entry : salesByProduct.entrySet()) {
            Product product = entry.getValue().get(0).getProduct();
            int quantitySold = entry.getValue().stream().mapToInt(sale -> safeQuantity(sale.getQuantity())).sum();
            double revenue = entry.getValue().stream().mapToDouble(sale -> safePrice(sale.getTotalPrice(), 0F)).sum();
            double estimatedCost = quantitySold * safePrice(product.getCostPrice(), 0F);

            Map<String, Object> row = new LinkedHashMap<>();
            row.put("productId", product.getId());
            row.put("productName", product.getName());
            row.put("sku", product.getSku());
            row.put("quantitySold", quantitySold);
            row.put("revenue", revenue);
            row.put("estimatedCost", estimatedCost);
            row.put("estimatedProfit", revenue - estimatedCost);
            rows.add(row);
        }
        return rows;
    }

    public List<Map<String, Object>> salesReport() {
        return saleRepository.findAll().stream().map(sale -> {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("saleId", sale.getId());
            row.put("saleDate", sale.getSaleDate());
            row.put("customerName", sale.getConsumer() == null ? null : sale.getConsumer().getName());
            row.put("productName", sale.getProduct() == null ? null : sale.getProduct().getName());
            row.put("sku", sale.getProduct() == null ? null : sale.getProduct().getSku());
            row.put("quantity", sale.getQuantity());
            row.put("totalPrice", sale.getTotalPrice());
            row.put("taxed", sale.getTaxed());
            return row;
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> materialConsumptionReport() {
        return consumptionRepository.findAll().stream().map(consumption -> {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("consumptionId", consumption.getId());
            row.put("consumptionDate", consumption.getConsumptionDate());
            row.put("productionId", consumption.getProduction() == null ? null : consumption.getProduction().getId());
            row.put("batchNumber", consumption.getProduction() == null ? null : consumption.getProduction().getBatchNumber());
            row.put("productName", consumption.getProduction() == null || consumption.getProduction().getProduct() == null ? null : consumption.getProduction().getProduct().getName());
            row.put("materialName", consumption.getMaterial() == null ? null : consumption.getMaterial().getName());
            row.put("quantity", consumption.getQuantity());
            return row;
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> expenseBreakdown() {
        List<Map<String, Object>> rows = new ArrayList<>();
        rows.add(expenseRow("asset", expensesService.listAssetExpenses().stream().mapToDouble(expense -> safePrice(expense.getAmount(), 0F)).sum()));
        rows.add(expenseRow("labour", expensesService.listLabourExpenses().stream().mapToDouble(expense -> safePrice(expense.getAmount(), 0F)).sum()));
        rows.add(expenseRow("other", expensesService.listOtherExpenses().stream().mapToDouble(expense -> safePrice(expense.getAmount(), 0F)).sum()));
        rows.add(expenseRow("utility", expensesService.listUtilityExpenses().stream().mapToDouble(expense -> safePrice(expense.getAmount(), 0F)).sum()));
        rows.add(expenseRow("material_purchase", purchaseRespository.findAll().stream().mapToDouble(purchase -> safePrice(purchase.getTotalPrice(), 0F)).sum()));
        return rows;
    }

    public List<?> stockMovementHistory() {
        return stockMovementRepository.findAll();
    }

    private Map<String, Object> valuationRow(String itemType, Long itemId, String name, String sku, int quantity, double unitValue, double totalValue) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("itemType", itemType);
        row.put("itemId", itemId);
        row.put("name", name);
        row.put("sku", sku);
        row.put("quantity", quantity);
        row.put("unitValue", unitValue);
        row.put("totalValue", totalValue);
        return row;
    }

    private Map<String, Object> lowStockRow(String itemType, Long itemId, String name, String sku, String supplier, String unit, Integer quantity, Integer reorderPoint) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("itemType", itemType);
        row.put("itemId", itemId);
        row.put("name", name);
        row.put("sku", sku);
        row.put("supplier", supplier);
        row.put("unit", unit);
        row.put("quantity", safeQuantity(quantity));
        row.put("reorderPoint", reorderPoint);
        row.put("suggestedQuantity", safeQuantity(reorderPoint) - safeQuantity(quantity));
        return row;
    }

    private Map<String, Object> expenseRow(String type, double total) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("type", type);
        row.put("total", total);
        return row;
    }

    private boolean isLowStock(Integer quantity, Integer reorderPoint, Boolean active) {
        return (active == null || active)
                && reorderPoint != null
                && reorderPoint > 0
                && safeQuantity(quantity) <= reorderPoint;
    }

    private int safeQuantity(Integer quantity) {
        return quantity == null ? 0 : quantity;
    }

    private double safePrice(Float price, Float fallbackPrice) {
        if (price != null) {
            return price;
        }
        return fallbackPrice == null ? 0D : fallbackPrice;
    }
}
