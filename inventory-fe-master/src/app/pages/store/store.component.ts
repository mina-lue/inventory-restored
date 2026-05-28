import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../service/store-service.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../model/product.model';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzPaginationModule } from 'ng-zorro-antd/pagination'

@Component({
  selector: 'app-store',
  imports: [NzTableModule, NzDividerModule, CommonModule, NzCardComponent,NzPaginationModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  storeItems:any[];
  loading = true;
  total=10;
  startAt= 0;
  size = 10;
constructor(private store: InventoryService){
  this.storeItems = store.demo.items;
  this.loading = false;
  this.total = store.demo.total;
}

onPageChange($event:any){
  console.log($event)
}

onPageSizeChange($event:any){
  console.log($event)
}
}
