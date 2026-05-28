import { Component } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common'
import { Observable, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-product-items',
  imports: [NzPaginationModule, NzCardComponent, NzTableModule, CommonModule, RouterLink, NzIconModule],
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.scss'
})
export class ProductItemsComponent {
  total = 10;
  startAt = 0;
  size = 10;
  productsInStore: Observable<Product[]>;

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
