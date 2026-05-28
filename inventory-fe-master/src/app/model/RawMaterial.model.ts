export interface RawMaterial{
  id?:number;
  name: string,
  sku?: string,
  barcode?: string,
  category?: string,
  supplier?: string,
  price: string,
  costPrice?: number,
  quantity?: number,
  reorderPoint?: number,
  location?: string,
  active?: boolean,
  unit: String
}
