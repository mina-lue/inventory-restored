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

@Component({
  selector: 'app-transactions-all',
  imports: [NzIconModule, RouterLink, NzCardComponent, NzTableModule, CommonModule, DateRangeSelectComponent],
  templateUrl: './transactions-all.component.html',
  styleUrl: './transactions-all.component.scss'
})
export class TransactionsAllComponent {
expenses$: Observable<any[]>;
startValue: Date = new Date();
endValue: Date = new Date();
dateRangePreset: DateRangePreset = 'week';
mode="date"

   constructor(private service: TransactionsService){
    const initialDateRange = getDateRangeForPreset(this.dateRangePreset);
    this.startValue = initialDateRange.start;
    this.endValue = initialDateRange.end;
    this.expenses$ = this.service.getAllTransactionsInDates(formatDate(this.startValue), formatDate(this.endValue)).pipe(startWith([]));
   }


onPageChange(event:any){

}

onPageSizeChange(event:any){

}

refreshDateRangeData(): void {
  this.expenses$ = this.service.getAllTransactionsInDates(formatDate(this.startValue), formatDate(this.endValue));
}
}
