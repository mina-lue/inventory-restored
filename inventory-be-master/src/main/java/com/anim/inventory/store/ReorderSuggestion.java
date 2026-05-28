package com.anim.inventory.store;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ReorderSuggestion {
    private String itemType;
    private Long itemId;
    private String itemName;
    private String sku;
    private String supplier;
    private String unit;
    private Integer currentQuantity;
    private Integer reorderPoint;
    private Integer suggestedQuantity;
}
