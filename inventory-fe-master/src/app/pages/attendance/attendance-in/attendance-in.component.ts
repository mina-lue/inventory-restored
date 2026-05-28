import { Component, OnInit } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../model/employee.model';
import { InventoryService } from '../../../service/store-service.service';
import { Observable, startWith } from 'rxjs';
import { AttendanceService } from '../../../service/attendance.service';
import { ListPaginationComponent } from '../../lib/list-pagination/list-pagination.component';
import { PaginatePipe } from '../../lib/paginate/paginate.pipe';


@Component({
  selector: 'app-attendance-in',
  imports: [NzCardComponent, NzTableModule, CommonModule,NzCheckboxModule,NzButtonModule, FormsModule, NzIconModule, ListPaginationComponent, PaginatePipe],
  templateUrl: './attendance-in.component.html',
  styleUrl: './attendance-in.component.scss'
})
export class AttendanceInComponent implements OnInit{
  employees$!: Observable<any[]>;
  today = new Date().toLocaleDateString();
  total = 0;
  pageIndex = 1;
  pageSize = 20;
//  attendances: any[] = [];


    constructor(private service:InventoryService, private attendanceService: AttendanceService){
      this.service.getEmployeesCount().subscribe(total => {
        this.total = total;
        this.employees$ = this.service.getEmployeesPage({ page: 0, size: total }).pipe(startWith([]));
      });
  /*    this.employees$.pipe().subscribe((data: Employee[])=>{
        data.forEach((emp)=>{
          this.attendances.push({
            employee: emp,
            inTime: undefined,
            come: false,
            date: new Date()
          })
        })

      }); */
    }

    ngOnInit():void{
    }

    check(employee: any): void{
      if(employee.timeIn != null){

      } else{
        this.attendanceService.addAttendanceIn(employee);
      }
    }

   /* saveAttendance(){
      this.attendanceService.addAttendanceIn(this.attendances);
    } */

    resetAttendanceIn(){
      this.attendanceService.removeIn();
    }
}
