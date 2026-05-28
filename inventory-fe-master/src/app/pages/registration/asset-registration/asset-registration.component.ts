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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Asset } from '../../../model/Asset.model';

@Component({
  selector: 'app-asset-registration',
  imports: [RouterLink, NzIconModule, FormsModule, ReactiveFormsModule,   NzFormModule, NzInputModule, NzSelectModule, NzInputNumberModule, NzCardComponent, CommonModule, NzButtonComponent],
  templateUrl: './asset-registration.component.html',
  styleUrl: './asset-registration.component.scss'
})
export class AssetRegistrationComponent {
private fb = inject(FormBuilder);
  assetId: number | null = null;
  isEdit = false;

  validateForm = this.fb.group({
    name:[undefined, Validators.required],
    value:[undefined, Validators.required],
    quantity:[undefined, Validators.required]
  })


  constructor(
    private readonly service: InventoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ){
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.assetId = idParam ? Number(idParam) : null;
    this.isEdit = !!this.assetId;
    if (this.assetId) {
      this.service.getAssetById(this.assetId).subscribe(asset => {
        if (!asset) {
          return;
        }
        this.validateForm.patchValue({
          name: asset.name,
          value: asset.value,
          quantity: asset.quantity,
        } as any);
      });
    }
  }

    save(data: any){
      if(this.validateForm.valid){
      const payload: Asset = {name: data.name, value: data.value, quantity: data.quantity};
      if (this.isEdit && this.assetId) {
        this.service.updateAsset(this.assetId, payload, () => this.router.navigate(['/store/assets']));
      } else {
        this.service.addAsset(payload, () => this.validateForm.reset());
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
