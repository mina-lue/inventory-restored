import { Component } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable, startWith } from 'rxjs';
import { TransactionsService } from '../../../service/transactions.service';
import { formatDate } from '../../../lib/DateFormatter';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { DateRangePreset, DateRangeSelectComponent, getDateRangeForPreset } from '../../lib/date-range-select/date-range-select.component';
import { ListPaginationComponent } from '../../lib/list-pagination/list-pagination.component';
import { PaginatePipe } from '../../lib/paginate/paginate.pipe';


@Component({
  selector: 'app-other-expenses',
  imports: [NzIconModule, RouterLink, NzCardComponent, NzTableModule, CommonModule, DateRangeSelectComponent, ListPaginationComponent, PaginatePipe],
  templateUrl: './other-expenses.component.html',
  styleUrl: './other-expenses.component.scss'
})
export class OtherExpensesComponent {
expenses$: Observable<any[]>;

startValue: Date = new Date();
  endValue: Date = new Date();
  dateRangePreset: DateRangePreset = 'week';
  mode="date"
  pageIndex = 1;
  pageSize = 20;

   constructor(private service: TransactionsService){
    const initialDateRange = getDateRangeForPreset(this.dateRangePreset);
    this.startValue = initialDateRange.start;
    this.endValue = initialDateRange.end;
    this.expenses$ = this.service.getOthersInDates(formatDate(this.startValue), formatDate(this.endValue)).pipe(startWith([]));
   }


onPageChange(event:any){
  this.pageIndex = event;
}

onPageSizeChange(event:any){
  this.pageSize = event;
  this.pageIndex = 1;
}
refreshDateRangeData(): void {
  this.expenses$ = this.service.getOthersInDates(formatDate(this.startValue), formatDate(this.endValue));
  this.pageIndex = 1;
}
}
