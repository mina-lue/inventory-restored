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
import { InventoryService } from '../../../service/store-service.service';
import { Observable } from 'rxjs';
import { Asset } from '../../../model/Asset.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-asset',
  imports: [NzIconModule, RouterLink, FormsModule, ReactiveFormsModule,   NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.scss'
})
export class AssetComponent {
private fb = inject(FormBuilder);
assets$ : Observable<any[]>

    validateForm = this.fb.group({
      description:[undefined, Validators.required],
      amount:[undefined, Validators.required],
      assetItem:[undefined, Validators.required],
    })


    constructor(private readonly service: TransactionsService, private readonly inventory: InventoryService){
      this.assets$ = this.inventory.getAssets();
    }

    save(data: any){
      if(this.validateForm.valid){
        this.service.addAssetExpenses({description: data.description, amount: (data.amount), asset: data.assetItem, date: new Date()});
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
