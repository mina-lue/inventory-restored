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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-registation',
  imports: [RouterLink, NzIconModule, FormsModule, NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent, ReactiveFormsModule],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.scss'
})
export class ProductRegistationComponent implements OnInit{
  private fb = inject(FormBuilder);

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


  constructor(private readonly service: InventoryService){
  }

  ngOnInit(): void {
  }

  save(data: any){
    if(this.validateForm.valid){
      this.service.addProduct({
        ...data,
        price: data.sellingPrice
      });
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
