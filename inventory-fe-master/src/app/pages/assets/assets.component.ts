import { Component } from '@angular/core';
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { ListPaginationComponent } from '../lib/list-pagination/list-pagination.component';
import { PaginatePipe } from '../lib/paginate/paginate.pipe';

@Component({
  selector: 'app-assets',
  imports: [NzCardComponent,NzTableModule, CommonModule, RouterLink, NzIconModule, ListPaginationComponent, PaginatePipe],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss'
})
export class AssetsComponent {
  assets$: Observable<any[]>;
  total = 0;
  pageIndex = 1;
  pageSize = 20;

  constructor(service: InventoryService){
    this.assets$ = service.getAssets();
    service.getAssetsCount().subscribe(total => this.total = total);
  }
}
