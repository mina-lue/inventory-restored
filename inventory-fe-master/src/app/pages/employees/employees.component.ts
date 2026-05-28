import { Component } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable, startWith } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees',
  imports: [NzPaginationModule, NzCardComponent, NzTableModule, CommonModule, RouterLink, NzIconModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  total = 10;
  startAt = 0;
  size = 10;
  employees$: Observable<any[]>;

  constructor(private readonly store:InventoryService){
    this.total= store.productsInStore.total;
    this.employees$ = store.getEmployees().pipe(startWith([]));
  }


  onPageChange($event:any){
    console.log($event);
  }
  onPageSizeChange($event:any){
    console.log($event);
  }
}
