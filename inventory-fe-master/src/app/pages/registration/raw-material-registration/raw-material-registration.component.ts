import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common'
import { NzButtonComponent } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { InventoryService } from '../../../service/store-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RawMaterial } from '../../../model/RawMaterial.model';

@Component({
  selector: 'app-raw-material-registration',
  imports: [RouterLink,NzIconModule, FormsModule, NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent, ReactiveFormsModule],
  templateUrl: './raw-material-registration.component.html',
  styleUrl: './raw-material-registration.component.scss'
})
export class RawMaterialRegistrationComponent {
  private fb = inject(FormBuilder);
  materialId: number | null = null;
  isEdit = false;

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


    constructor(
      private readonly service: InventoryService,
      private readonly route: ActivatedRoute,
      private readonly router: Router
    ){
    }

    ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      this.materialId = idParam ? Number(idParam) : null;
      this.isEdit = !!this.materialId;
      if (this.materialId) {
        this.service.getMaterialById(this.materialId).subscribe(material => {
          if (!material) {
            return;
          }
          this.validateForm.patchValue({
            name: material.name,
            sku: material.sku,
            barcode: material.barcode,
            category: material.category,
            supplier: material.supplier,
            costPrice: material.costPrice,
            price: material.price as any,
            reorderPoint: material.reorderPoint ?? 0,
            location: material.location,
            unit: material.unit,
          } as any);
        });
      }
    }

    save(data: any){
      if(this.validateForm.valid){
        const payload: RawMaterial = data;
        if (this.isEdit && this.materialId) {
          this.service.updateMaterial(this.materialId, payload, () => this.router.navigate(['/store/materials']));
        } else {
          this.service.addMaterial(payload, () => this.validateForm.reset({ reorderPoint: 0 }));
        }
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
