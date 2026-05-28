import { Component,inject,TemplateRef } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators  } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common'
import { NzButtonComponent } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InventoryService } from '../../../service/store-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-raw-material-registration',
  imports: [RouterLink,NzIconModule, FormsModule, NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent, ReactiveFormsModule],
  templateUrl: './raw-material-registration.component.html',
  styleUrl: './raw-material-registration.component.scss'
})
export class RawMaterialRegistrationComponent {
  private fb = inject(FormBuilder);

    validateForm = this.fb.group({
      name:[undefined, Validators.required],
      sku:[undefined],
      barcode:[undefined],
      category:[undefined],
      supplier:[undefined],
      costPrice:[undefined],
      price:[undefined, Validators.required],
      reorderPoint:[0],
      location:[undefined],
      unit:[undefined, Validators.required],
    })


    constructor(private readonly service: InventoryService){
    }

    ngOnInit(): void {
    }

    save(data: any){
      if(this.validateForm.valid){
        console.log(data)
        this.service.addMaterial(data, () => this.validateForm.reset({ reorderPoint: 0 }));
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
