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


@Component({
  selector: 'app-product',
  imports: [FormsModule, NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent, ReactiveFormsModule, NzIconModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
private fb = inject(FormBuilder);
 productsInStore$: Observable<any[]>;

    validateForm = this.fb.group({
      productItem:[undefined, Validators.required],
      quantity:[undefined, Validators.required],
    })


    constructor(private readonly service: InventoryService){
      this.productsInStore$= this.service.getProducts({page:0, size:10}).pipe(startWith([]));
      this.productsInStore$.pipe().subscribe((data)=>{
        console.log(data);
      })
    }

    save(data: any){
      if(this.validateForm.valid){
        console.log(data.productItem.id, data.quantity )
        this.service.addProductInStore(data.productItem, data.quantity);
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
