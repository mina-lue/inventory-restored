import { Component } from '@angular/core';
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-assets',
  imports: [NzCardComponent,NzTableModule, CommonModule, RouterLink, NzIconModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss'
})
export class AssetsComponent {
  assets$: Observable<any[]>;

  constructor(service: InventoryService){
    this.assets$ = service.getAssets();
  }
}
