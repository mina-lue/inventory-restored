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
  selector: 'app-other',
  imports: [RouterLink, NzIconModule, FormsModule, ReactiveFormsModule,   NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent],
  templateUrl: './other.component.html',
  styleUrl: './other.component.scss'
})
export class OtherComponent {
private fb = inject(FormBuilder);

    validateForm = this.fb.group({
      description:[undefined, Validators.required],
      amount:[undefined, Validators.required]
    })


    constructor(private readonly service: TransactionsService){
    }

    save(data: any){
      if(this.validateForm.valid){
        this.service.addOtherExpenses({description:data.description, amount: data.amount});
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
