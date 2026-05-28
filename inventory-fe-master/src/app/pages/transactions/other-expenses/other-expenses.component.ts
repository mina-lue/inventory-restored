import { Component, ViewChild } from '@angular/core';
import { InventoryService } from '../../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable, startWith } from 'rxjs';
import { TransactionsService } from '../../../service/transactions.service';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { formatDate } from '../../../lib/DateFormatter';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-other-expenses',
  imports: [NzIconModule, RouterLink, FormsModule, NzDatePickerComponent, NzDatePickerModule, NzCardComponent, NzTableModule, CommonModule],
  templateUrl: './other-expenses.component.html',
  styleUrl: './other-expenses.component.scss'
})
export class OtherExpensesComponent {
expenses$: Observable<any[]>;

startValue: Date = new Date();
  endValue: Date = new Date();
  mode="date"
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

   constructor(private service: TransactionsService){
    this.expenses$ = this.service.getOthers().pipe(startWith([]));
   }


onPageChange(event:any){

}

onPageSizeChange(event:any){

}
disabledStartDate = (startValue: Date): boolean => {
  if (!startValue || !this.endValue) {
    return false;
  }
  return startValue.getTime() > this.endValue.getTime();
};

disabledEndDate = (endValue: Date): boolean => {
  if (!endValue || !this.startValue) {
    return false;
  }
  return endValue.getTime() <= this.startValue.getTime();
};

handleStartOpenChange(open: boolean): void {
  if (!open) {
    this.endDatePicker.open();
  }
}

handleEndOpenChange(open: boolean): void {
  this.expenses$ = this.service.getOthersInDates(formatDate(this.startValue), formatDate(this.endValue));
}
}
