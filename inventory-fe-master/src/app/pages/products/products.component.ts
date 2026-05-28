import { Component } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common'
import { Observable, startWith } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [NzPaginationModule, NzCardComponent, NzTableModule, CommonModule, NzIconModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  total = 10;
  startAt = 0;
  size = 10;
  productsInStore: Observable<any[]>;

  constructor(private readonly store:InventoryService){
    this.total= store.productsInStore.total;
    this.productsInStore = store.getProducts({size:10, page:0}).pipe(startWith([]));
  }


  onPageChange($event:any){
    console.log($event);
  }
  onPageSizeChange($event:any){
    console.log($event);
  }


}
