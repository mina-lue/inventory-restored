import { Component } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { TransactionsService } from '../../../service/transactions.service';
import { Observable, startWith } from 'rxjs';
import { formatDate } from '../../../lib/DateFormatter';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { DateRangePreset, DateRangeSelectComponent, getDateRangeForPreset } from '../../lib/date-range-select/date-range-select.component';
import { ListPaginationComponent } from '../../lib/list-pagination/list-pagination.component';
import { PaginatePipe } from '../../lib/paginate/paginate.pipe';

@Component({
  selector: 'app-raw-materials-in',
  imports: [NzIconModule, RouterLink, NzCardComponent, NzTableModule, CommonModule, DateRangeSelectComponent, ListPaginationComponent, PaginatePipe],
  templateUrl: './raw-materials-in.component.html',
  styleUrl: './raw-materials-in.component.scss'
})
export class RawMaterialsInComponent {
  materialsIn$: Observable<any[]>;
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
    this.materialsIn$ = this.service.getRawMaterialsCollectedInDates(formatDate(this.startValue), formatDate(this.endValue)).pipe(startWith([]));
  }

  refreshDateRangeData(): void {
    this.materialsIn$ = this.service.getRawMaterialsCollectedInDates(formatDate(this.startValue), formatDate(this.endValue)).pipe(startWith([]));
    this.pageIndex = 1;
  }
}
