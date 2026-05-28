export interface ReorderSuggestion {
  itemType: string;
  itemId: number;
  itemName: string;
  sku?: string;
  supplier?: string;
  unit?: string;
  currentQuantity: number;
  reorderPoint: number;
  suggestedQuantity: number;
}
