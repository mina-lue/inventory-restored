import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';

export type DateRangePreset = 'today' | 'week' | 'month' | 'all' | 'custom';

export interface DateRangeValue {
  start: Date;
  end: Date;
  preset: DateRangePreset;
}

export function getDateRangeForPreset(preset: DateRangePreset): Pick<DateRangeValue, 'start' | 'end'> {
  const today = new Date();
  const start = new Date(today);

  if (preset === 'today') {
    return { start, end: today };
  }

  if (preset === 'week') {
    const day = start.getDay();
    const daysSinceMonday = day === 0 ? 6 : day - 1;
    start.setDate(start.getDate() - daysSinceMonday);
    return { start, end: today };
  }

  if (preset === 'month') {
    start.setDate(1);
    return { start, end: today };
  }

  if (preset === 'all') {
    return { start: new Date(0), end: today };
  }

  return { start, end: today };
}

@Component({
  selector: 'app-date-range-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NzDatePickerModule, NzSelectModule],
  templateUrl: './date-range-select.component.html',
  styleUrl: './date-range-select.component.scss'
})
export class DateRangeSelectComponent implements OnInit {
  @Input() startValue: Date = new Date();
  @Input() endValue: Date = new Date();
  @Input() preset: DateRangePreset = 'week';

  @Output() startValueChange = new EventEmitter<Date>();
  @Output() endValueChange = new EventEmitter<Date>();
  @Output() presetChange = new EventEmitter<DateRangePreset>();
  @Output() rangeChange = new EventEmitter<DateRangeValue>();

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  ngOnInit(): void {
    if (this.preset !== 'custom') {
      this.setPresetRange(this.preset);
    }
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
    if (open || this.preset !== 'custom') {
      return;
    }

    this.emitRangeChange();
  }

  onPresetChange(value: DateRangePreset): void {
    this.preset = value;
    this.presetChange.emit(value);

    if (value !== 'custom') {
      this.setPresetRange(value);
      this.emitRangeChange();
    }
  }

  private setPresetRange(preset: DateRangePreset): void {
    const range = getDateRangeForPreset(preset);
    this.setRange(range.start, range.end);
  }

  private setRange(start: Date, end: Date): void {
    this.startValue = start;
    this.endValue = end;
    this.startValueChange.emit(start);
    this.endValueChange.emit(end);
  }

  private emitRangeChange(): void {
    this.rangeChange.emit({
      start: this.startValue,
      end: this.endValue,
      preset: this.preset
    });
  }
}
