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
  selector: 'app-customer-registration',
  imports: [RouterLink, NzIconModule,FormsModule, NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent, ReactiveFormsModule],
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.scss'
})
export class CustomerRegistrationComponent {

    private fb = inject(FormBuilder);

    validateForm = this.fb.group({
      type:[undefined, Validators.required],
      name:[undefined, Validators.required],
    })


    constructor(private readonly service: InventoryService){
    }

    ngOnInit(): void {
    }

    save(data: any){
      if(this.validateForm.valid){
        console.log(data)
        this.service.addCustomer(data);
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
