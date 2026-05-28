import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-asset-registration',
  imports: [RouterLink, NzIconModule, FormsModule, ReactiveFormsModule,   NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent],
  templateUrl: './asset-registration.component.html',
  styleUrl: './asset-registration.component.scss'
})
export class AssetRegistrationComponent {
private fb = inject(FormBuilder);

  validateForm = this.fb.group({
    name:[undefined, Validators.required],
    value:[undefined, Validators.required],
    quantity:[undefined, Validators.required]
  })


  constructor(private readonly service: InventoryService){
  }

  save(data: any){
    if(this.validateForm.valid){
      this.service.addAsset({name: data.name, value: data.value, quantity: data.quantity});
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
