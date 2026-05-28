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
import { Observable, startWith } from 'rxjs';
import { RawMaterial } from '../../../model/RawMaterial.model';
import { Product } from '../../../model/product.model';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProductBomItem } from '../../../model/ProductBomItem.model';


@Component({
  selector: 'app-product',
  imports: [FormsModule, NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent, ReactiveFormsModule, NzIconModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
private fb = inject(FormBuilder);
 productsInStore$: Observable<any[]>;
 materials$: Observable<RawMaterial[]>;
 bomItems$: Observable<ProductBomItem[]> | undefined;

    validateForm = this.fb.group({
      productItem:[undefined, Validators.required],
      quantity:[undefined, Validators.required],
      batchNumber:[undefined],
      wastageQuantity:[0],
      responsibleEmployee:[undefined],
      note:[undefined],
    })

    bomForm = this.fb.group({
      productItem:[undefined, Validators.required],
      material:[undefined, Validators.required],
      quantityPerUnit:[undefined, Validators.required],
      wastagePercent:[0],
      note:[undefined],
    })


    constructor(private readonly service: InventoryService){
      this.productsInStore$= this.service.getProducts({page:0, size:10}).pipe(startWith([]));
      this.materials$= this.service.getMaterials().pipe(startWith([]));
      this.productsInStore$.pipe().subscribe((data)=>{
        console.log(data);
      })
    }

    save(data: any){
      if(this.validateForm.valid){
        this.service.addProductInStore(data.productItem, data);
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

    loadBom(product: any){
      if (product?.id) {
        this.bomItems$ = this.service.getProductBomItems(product.id);
      }
    }

    saveBom(data: any){
      if(this.bomForm.valid){
        this.service.addProductBomItem({
          product: { id: data.productItem.id },
          material: { id: data.material.id },
          quantityPerUnit: data.quantityPerUnit,
          wastagePercent: data.wastagePercent,
          note: data.note
        });
        this.loadBom(data.productItem);
      } else {
        Object.values(this.bomForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
}
