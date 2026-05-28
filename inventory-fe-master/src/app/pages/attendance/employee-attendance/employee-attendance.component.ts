import { Component, Input } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-attendance',
  imports: [NzTableComponent, CommonModule],
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.scss'
})
export class EmployeeAttendanceComponent {
@Input() employeeAttendance: any[] | undefined;
@Input() employeeName: string = "";

}
