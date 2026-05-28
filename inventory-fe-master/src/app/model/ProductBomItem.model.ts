import { Product } from './product.model';
import { RawMaterial } from './RawMaterial.model';

export interface ProductBomItem {
  id?: number;
  product: Partial<Product>;
  material: Partial<RawMaterial>;
  quantityPerUnit: number;
  wastagePercent?: number;
  note?: string;
}
