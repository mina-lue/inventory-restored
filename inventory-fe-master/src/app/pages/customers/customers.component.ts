import { Component } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-customers',
  imports: [NzPaginationModule, NzCardComponent, NzTableModule, CommonModule, RouterLink, NzIconModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
total = 10;
  startAt = 0;
  size = 10;
  customers$: Observable<any[]>;

  constructor(private readonly store:InventoryService){
    this.total= store.productsInStore.total;
    this.customers$ = store.getCustomers().pipe(startWith([]));
  }


  onPageChange($event:any){
    console.log($event);
  }
  onPageSizeChange($event:any){
    console.log($event);
  }
}
