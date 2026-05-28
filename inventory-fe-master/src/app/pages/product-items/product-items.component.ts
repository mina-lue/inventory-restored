import { Component } from '@angular/core';
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common'
import { Observable, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ListPaginationComponent } from '../lib/list-pagination/list-pagination.component';

@Component({
  selector: 'app-product-items',
  imports: [NzCardComponent, NzTableModule, CommonModule, RouterLink, NzIconModule, ListPaginationComponent],
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.scss'
})
export class ProductItemsComponent {
  total = 0;
  pageIndex = 1;
  pageSize = 20;
  productsInStore!: Observable<Product[]>;

  constructor(private readonly store:InventoryService){
    this.loadProducts();
    this.store.getProductsCount().subscribe(total => this.total = total);
  }

  private loadProducts(): void {
    this.productsInStore = this.store.getProducts({size: this.pageSize, page: this.pageIndex - 1}).pipe(startWith([]));
  }

  onPageChange(pageIndex: number){
    this.pageIndex = pageIndex;
    this.loadProducts();
  }

  onPageSizeChange(pageSize: number){
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.loadProducts();
  }

}
