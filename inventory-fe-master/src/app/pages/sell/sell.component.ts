import { Component, inject, OnInit } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators  } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common'
import { NzButtonComponent } from 'ng-zorro-antd/button'
import { InventoryService } from '../../service/store-service.service';
import { Product } from '../../model/product.model';
import { Observable } from 'rxjs';
import { Customer } from '../../model/Customer.model';
import { TransactionsService } from '../../service/transactions.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sell',
  imports: [NzIconModule,RouterLink, FormsModule, NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent, ReactiveFormsModule],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.scss'
})
export class SellComponent implements OnInit{
  products: Observable<any[]>;
  customers: Observable<Customer[]>;
  noFSN = '';
constructor(private service:InventoryService, private transactionService: TransactionsService){
  this.products = this.service.getProducts({size:10, page:0});
  this.customers= this.service.getCustomers();
}
  ngOnInit(): void {
    this.validateForm.get('product')?.valueChanges.subscribe((product: any)=>{
      if(product){
        this.validateForm.get('price')?.setValue(product.price);
      }
    })
  }

 private fb = inject(FormBuilder);

  validateForm = this.fb.group({
    product:[undefined, Validators.required],
    price:[undefined, Validators.required],
    quantity:[undefined, Validators.required],
    FSN:[''],
    vat:[false, Validators.required],
    customer:[undefined, Validators.required],
  })

    save(data: any){
      if(this.validateForm.valid){
      this.transactionService.addProductSold({
        product: data.product,
        price: data.price,
        quantity: data.quantity,
        taxed: data.vat,
        FSN: data.FSN,
        consumer: data.customer,
        date: new Date(),
        totalPrice: data.price * data.quantity
      }, () => this.validateForm.reset({ vat: false }));
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
