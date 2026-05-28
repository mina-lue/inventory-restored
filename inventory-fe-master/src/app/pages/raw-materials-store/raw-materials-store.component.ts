import { Component } from '@angular/core';
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ListPaginationComponent } from '../lib/list-pagination/list-pagination.component';
import { PaginatePipe } from '../lib/paginate/paginate.pipe';

@Component({
  selector: 'app-raw-materials-store',
  imports: [NzCardComponent, NzTableModule, CommonModule, RouterLink, NzIconModule, ListPaginationComponent, PaginatePipe],
  templateUrl: './raw-materials-store.component.html',
  styleUrl: './raw-materials-store.component.scss'
})
export class RawMaterialsStoreComponent {
  materials$: Observable<any[]>;
  total = 0;
  pageIndex = 1;
  pageSize = 20;

  constructor(private service: InventoryService){
    this.materials$ = service.getMaterials();
    this.materials$.subscribe(items => this.total = items?.length ?? 0);
  }
}
