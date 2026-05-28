import { Component } from '@angular/core';
import { InventoryService } from '../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable, startWith } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { ListPaginationComponent } from '../lib/list-pagination/list-pagination.component';

@Component({
  selector: 'app-employees',
  imports: [NzCardComponent, NzTableModule, CommonModule, RouterLink, NzIconModule, ListPaginationComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  total = 0;
  pageIndex = 1;
  pageSize = 20;
  employees$!: Observable<any[]>;

  constructor(private readonly store:InventoryService){
    this.loadEmployees();
    this.store.getEmployeesCount().subscribe(total => this.total = total);
  }

  private loadEmployees(): void {
    this.employees$ = this.store.getEmployeesPage({ page: this.pageIndex - 1, size: this.pageSize }).pipe(startWith([]));
  }

  onPageChange(pageIndex: number){
    this.pageIndex = pageIndex;
    this.loadEmployees();
  }

  onPageSizeChange(pageSize: number){
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.loadEmployees();
  }
}
