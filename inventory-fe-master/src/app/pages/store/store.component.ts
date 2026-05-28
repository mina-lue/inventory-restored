import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../service/store-service.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../model/product.model';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { ListPaginationComponent } from '../lib/list-pagination/list-pagination.component';
import { PaginatePipe } from '../lib/paginate/paginate.pipe';

@Component({
  selector: 'app-store',
  imports: [NzTableModule, NzDividerModule, CommonModule, NzCardComponent, ListPaginationComponent, PaginatePipe],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  storeItems:any[];
  loading = true;
  total=10;
  pageIndex = 1;
  pageSize = 20;
constructor(private store: InventoryService){
  this.storeItems = store.demo.items;
  this.loading = false;
  this.total = store.demo.total;
}

onPageChange(pageIndex:number){
  this.pageIndex = pageIndex;
}

onPageSizeChange(pageSize:number){
  this.pageSize = pageSize;
  this.pageIndex = 1;
}
}
