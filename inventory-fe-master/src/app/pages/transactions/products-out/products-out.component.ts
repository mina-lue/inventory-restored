import { Component } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable } from 'rxjs';
import { TransactionsService } from '../../../service/transactions.service';
import { formatDate } from '../../../lib/DateFormatter';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { DateRangePreset, DateRangeSelectComponent, getDateRangeForPreset } from '../../lib/date-range-select/date-range-select.component';


@Component({
  selector: 'app-products-out',
  imports: [NzIconModule, RouterLink, NzCardComponent, NzTableModule, CommonModule, DateRangeSelectComponent],
  templateUrl: './products-out.component.html',
  styleUrl: './products-out.component.scss'
})
export class ProductsOutComponent {
  startValue: Date = new Date();
  endValue: Date = new Date();
  dateRangePreset: DateRangePreset = 'week';


 productsOut$: Observable<any[]>;
 mode="date"
 constructor(private service: TransactionsService){
  const initialDateRange = getDateRangeForPreset(this.dateRangePreset);
  this.startValue = initialDateRange.start;
  this.endValue = initialDateRange.end;
  this.productsOut$ = this.service.getProductsSoldInDates(formatDate(this.startValue), formatDate(this.endValue));
 }

 refreshDateRangeData(): void {
  this.productsOut$ = this.service.getProductsSoldInDates(formatDate(this.startValue), formatDate(this.endValue));
}
}
