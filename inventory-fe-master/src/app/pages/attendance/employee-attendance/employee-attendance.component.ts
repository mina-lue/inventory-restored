import { Component, Input } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { ListPaginationComponent } from '../../lib/list-pagination/list-pagination.component';
import { PaginatePipe } from '../../lib/paginate/paginate.pipe';

@Component({
  selector: 'app-employee-attendance',
  imports: [NzTableComponent, CommonModule, ListPaginationComponent, PaginatePipe],
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.scss'
})
export class EmployeeAttendanceComponent {
  private _employeeAttendance: any[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 20;

  @Input() set employeeAttendance(value: any[] | undefined) {
    this._employeeAttendance = value ?? [];
    this.total = this._employeeAttendance?.length ?? 0;
    this.pageIndex = 1;
  }

  get employeeAttendance(): any[] {
    return this._employeeAttendance;
  }

  @Input() employeeName: string = "";

}
