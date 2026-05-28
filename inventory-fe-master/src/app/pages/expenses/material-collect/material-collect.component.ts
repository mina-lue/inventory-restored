import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common'
import { NzButtonComponent } from 'ng-zorro-antd/button'
import { TransactionsService } from '../../../service/transactions.service';
import { InventoryService } from '../../../service/store-service.service';
import { RawMaterial } from '../../../model/RawMaterial.model';
import { Observable } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-material-collect',
  imports: [RouterLink, NzIconModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent],
  templateUrl: './material-collect.component.html',
  styleUrl: './material-collect.component.scss'
})
export class MaterialCollectComponent implements OnInit{
  private fb = inject(FormBuilder);
  materials$: Observable<RawMaterial[]>

      validateForm = this.fb.group({
        material:[undefined, Validators.required],
        unitPrice:[undefined, Validators.required],
        quantity:[undefined, Validators.required],
        totalPrice:[0, Validators.required],
        fsn:[''],
        taxed:[false, Validators.required],
      })

      constructor(private readonly service: TransactionsService, private readonly inventoryService: InventoryService){
      this.materials$ = inventoryService.getMaterials();
      }

  ngOnInit(): void {
     this.validateForm.get('material')?.valueChanges.subscribe((material: any)=>{
      if(material){
        this.validateForm.get('unitPrice')?.setValue(material?.price);
        this.validateForm.get('quantity')?.valueChanges.subscribe((quantity)=>{
          if(material.price && quantity){
            this.validateForm.get("totalPrice")?.setValue(<number>(material.price) * <number>quantity)
          }
        })
      }
    })

    this.validateForm.get('material')?.valueChanges.subscribe((material: any)=>{
      if(material){
        this.validateForm.get('unitPrice')?.setValue(material?.price);
      }
    })
  }


      save(data: any){
        if(this.validateForm.valid){
          console.log({material: data.material, quantity: data.quantity, totalPrice: data.totalPrice ,description: 'raw material collect', date: new Date()})
          this.service.addMaterialInStore({
            material: data.material,
            quantity: data.quantity,
            totalPrice: data.totalPrice ,
            fsn: data.FSN,
            taxed: data.vat });
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
