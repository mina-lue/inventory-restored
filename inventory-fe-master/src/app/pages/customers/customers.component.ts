import { Component } from '@angular/core';
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ListPaginationComponent } from '../lib/list-pagination/list-pagination.component';
import { Page } from '../../model/Page';

@Component({
  selector: 'app-customers',
  imports: [NzCardComponent, NzTableModule, CommonModule, RouterLink, NzIconModule, ListPaginationComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  total = 0;
  pageIndex = 1;
  pageSize = 20;
  customers$!: Observable<any[]>;

  constructor(private readonly store:InventoryService){
    this.loadCustomers();
    this.store.getCustomersCount().subscribe(total => this.total = total);
  }

  private loadCustomers(): void {
    this.customers$ = this.store.getCustomersPage({ page: this.pageIndex - 1, size: this.pageSize }).pipe(startWith([]));
  }

  onPageChange(pageIndex: number){
    this.pageIndex = pageIndex;
    this.loadCustomers();
  }

  onPageSizeChange(pageSize: number){
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.loadCustomers();
  }
}
