import { Component, ViewChild } from '@angular/core';
import { InventoryService } from '../../../service/store-service.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { TransactionsService } from '../../../service/transactions.service';
import { Observable } from 'rxjs';
import { formatDate } from '../../../lib/DateFormatter';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-raw-materials-in',
  imports: [NzIconModule, RouterLink, NzCardComponent, NzTableModule, CommonModule, FormsModule, NzDatePickerComponent, NzDatePickerModule],
  templateUrl: './raw-materials-in.component.html',
  styleUrl: './raw-materials-in.component.scss'
})
export class RawMaterialsInComponent {
  materialsIn$: Observable<any[]>;
  startValue: Date = new Date();
  endValue: Date = new Date();
  mode="date"
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  constructor(private service: TransactionsService){
    this.materialsIn$ = this.service.getRawMaterialsCollected();
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
    this.materialsIn$ = this.service.getRawMaterialsCollectedInDates(formatDate(this.startValue), formatDate(this.endValue));
  }
}
