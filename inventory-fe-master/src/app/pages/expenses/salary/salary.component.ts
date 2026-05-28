import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../model/employee.model';
import { InventoryService } from '../../../service/store-service.service';
import { Observable } from 'rxjs';
import { AttendanceService } from '../../../service/attendance.service';
import { TransactionsService } from '../../../service/transactions.service';
import { RouterLink } from '@angular/router';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { EmployeeAttendanceComponent } from "../../attendance/employee-attendance/employee-attendance.component";

@Component({
  selector: 'app-salary',
  imports: [EmployeeAttendanceComponent, RouterLink, NzDatePickerModule, NzCardComponent, NzTableModule, CommonModule, NzCheckboxModule, NzButtonModule, FormsModule, NzIconModule, EmployeeAttendanceComponent],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.scss'
})
export class SalaryComponent implements OnInit{
[x: string]: any;
  employees$: Observable<any[]>;
  today = new Date().toLocaleDateString();
  salaries: any[] = [];
  salariesToPay: any[] = [];
  startValue= new Date();
  endValue = new Date();
  employeeAttendances$ : Observable<any[]> | undefined;

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  empAttendance: any[] = [];
  employeeName :string = "";


    constructor(private service:InventoryService, private attendanceService: AttendanceService, private readonly transactionService :TransactionsService){
      this.startValue.setDate(this.startValue.getDate()-30)
      this.employees$ = this.attendanceService.getAttendanceHours(this.startValue, this.endValue);
      this.employees$.subscribe((data: any[])=>{
        data.forEach((emp)=>{
          this.salaries.push({
            employee: emp.employee,
            amount: emp.amount,
            date: this.today,
            workHour: emp.workedHours,
            paid: false
          })
        })

      });
    }

    ngOnInit():void{
      console.log(this.salaries);
      this.attendanceService.getAttendanceHours(this.startValue, this.endValue).subscribe((data)=>{
        console.log(data);
      })
    }

    check(id: number): void{
      this.salaries.forEach((salary)=>{
        if(salary.employee.id === id){
          if(!salary.paid){
            this.salariesToPay = this.salariesToPay.filter((sal)=> sal.employee.id !== id);
          }else{
            this.salariesToPay.push(salary);
          }
        }
      });

      console.log(this.salariesToPay);
    }

    saveSalaries(){
      this.transactionService.addSalariesPay(this.salariesToPay);
    }

    loadEmpWorkHours(emp: any){
      console.log(emp);
      this.employeeAttendances$ = this.attendanceService.getEmployeeAttendance(emp.id, this.startValue, this.endValue);
      this.employeeAttendances$.subscribe((d)=>{
        this.empAttendance = d;
        this.employeeName = emp.name;
      })
    }

    closeEmpAttendances(){
      this.employeeAttendances$ = undefined;
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
      console.log('handleStartOpenChange', open);
    }

    handleEndOpenChange(open: boolean): void {
      this.attendanceService.getAttendanceHours(this.startValue, this.endValue).subscribe((data)=>{
        console.log(data);
      })
    }
}
