import { Component, ViewChild } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { Observable } from 'rxjs';
import { TransactionsService } from '../../../service/transactions.service';
import { FormsModule } from '@angular/forms';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { formatDate } from '../../../lib/DateFormatter';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-products-out',
  imports: [NzIconModule, RouterLink, NzCardComponent, NzTableModule, CommonModule,FormsModule, NzDatePickerModule],
  templateUrl: './products-out.component.html',
  styleUrl: './products-out.component.scss'
})
export class ProductsOutComponent {
  startValue: Date = new Date();
  endValue: Date = new Date();
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;


 productsOut$: Observable<any[]>;
 mode="date"
 constructor(private service: TransactionsService){
  this.productsOut$ = this.service.getProductsSold();
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
  this.productsOut$ = this.service.getProductsSoldInDates(formatDate(this.startValue), formatDate(this.endValue));
}
}
