import { Component, inject, OnInit } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators  } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common'
import { NzButtonComponent } from 'ng-zorro-antd/button'
import { InventoryService } from '../../../service/store-service.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-product-registation',
  imports: [RouterLink, NzIconModule, FormsModule, NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent, ReactiveFormsModule],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.scss'
})
export class ProductRegistationComponent implements OnInit{
  private fb = inject(FormBuilder);
  productId: number | null = null;
  isEdit = false;
  existingQuantity = 0;
  existingSoldQuantity = 0;
  existingActive = true;
  existingTaxRate: number | null = null;

  validateForm = this.fb.group({
    name:[undefined, Validators.required],
    sku:[undefined],
    barcode:[undefined],
    category:[undefined],
    supplier:[undefined],
    costPrice:[undefined],
    sellingPrice:[undefined, Validators.required],
    price:[undefined],
    reorderPoint:[0],
    location:[undefined],
    batchNumber:[undefined],
    serialNumber:[undefined],
    expiryDate:[undefined],
    unit:[undefined, Validators.required],
  })


  constructor(
    private readonly service: InventoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ){
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? Number(idParam) : null;
    this.isEdit = !!this.productId;
    if (this.productId) {
      this.service.getProductById(this.productId).subscribe(product => {
        if (!product) {
          return;
        }
        this.existingQuantity = product.quantity ?? 0;
        this.existingSoldQuantity = product.soldQuantity ?? 0;
        this.existingActive = product.active ?? true;
        this.existingTaxRate = product.taxRate ?? null;
        this.validateForm.patchValue({
          name: product.name,
          sku: product.sku,
          barcode: product.barcode,
          category: product.category,
          supplier: product.supplier,
          costPrice: product.costPrice,
          sellingPrice: product.sellingPrice ?? product.price,
          price: product.price ?? product.sellingPrice,
          reorderPoint: product.reorderPoint ?? 0,
          location: product.location,
          batchNumber: product.batchNumber,
          serialNumber: product.serialNumber,
          expiryDate: product.expiryDate,
          unit: product.unit,
        } as any);
      });
    }
  }

    save(data: any){
      if(this.validateForm.valid){
      const payload: Product = {
        ...data,
        price: data.sellingPrice,
        quantity: this.existingQuantity,
        soldQuantity: this.existingSoldQuantity,
        active: this.existingActive,
        taxRate: this.existingTaxRate ?? undefined
      };
      if (this.isEdit && this.productId) {
        this.service.updateProduct(this.productId, payload, () => this.router.navigate(['/products']));
      } else {
        this.service.addProduct(payload, () => this.validateForm.reset({ reorderPoint: 0 }));
      }
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
