import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { ReportsService } from '../../service/reports.service';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, RouterLink, NzCardComponent, NzIconModule, NzTableModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  valuation$: Observable<any>;
  lowStock$: Observable<any[]>;
  profitByProduct$: Observable<any[]>;
  sales$: Observable<any[]>;
  materialConsumption$: Observable<any[]>;
  expenseBreakdown$: Observable<any[]>;
  stockMovements$: Observable<any[]>;

  constructor(private reportsService: ReportsService) {
    this.valuation$ = reportsService.getInventoryValuation();
    this.lowStock$ = reportsService.getLowStock();
    this.profitByProduct$ = reportsService.getProfitByProduct();
    this.sales$ = reportsService.getSales();
    this.materialConsumption$ = reportsService.getMaterialConsumption();
    this.expenseBreakdown$ = reportsService.getExpenseBreakdown();
    this.stockMovements$ = reportsService.getStockMovements();
  }
}
