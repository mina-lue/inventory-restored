import { Component } from '@angular/core';
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-raw-materials-store',
  imports: [NzCardComponent, NzTableModule, CommonModule, RouterLink, NzIconModule],
  templateUrl: './raw-materials-store.component.html',
  styleUrl: './raw-materials-store.component.scss'
})
export class RawMaterialsStoreComponent {
  materials$: Observable<any[]>;

  constructor(private service: InventoryService){
    this.materials$ = service.getMaterials();
  }
}
