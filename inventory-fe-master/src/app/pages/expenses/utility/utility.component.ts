import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common'
import { NzButtonComponent } from 'ng-zorro-antd/button'
import { TransactionsService } from '../../../service/transactions.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-utility',
  imports: [RouterLink, NzIconModule, FormsModule, ReactiveFormsModule,   NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent],
  templateUrl: './utility.component.html',
  styleUrl: './utility.component.scss'
})
export class UtilityComponent {
private fb = inject(FormBuilder);

    validateForm = this.fb.group({
      name:[undefined, Validators.required],
      amount:[undefined, Validators.required]
    })


    constructor(private readonly service: TransactionsService){
    }

    save(data: any){
      if(this.validateForm.valid){
        console.log({name: data.name, amount: data.amount})
        this.service.addUtilityPayment({name: data.name, description:data.name, amount: -(data.amount), date: new Date()}, () => this.validateForm.reset());
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
