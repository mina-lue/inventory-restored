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
import { Observable } from 'rxjs';
import { AttendanceService } from '../../../service/attendance.service';
import { AttendanceIn } from '../../../model/attendance.model';

@Component({
  selector: 'app-attendance-out',
  imports: [NzCardComponent, NzTableModule, CommonModule,NzCheckboxModule,NzButtonModule, FormsModule, NzIconModule],
  templateUrl: './attendance-out.component.html',
  styleUrl: './attendance-out.component.scss'
})
export class AttendanceOutComponent {
  attendanceIns$: Observable<any[]>;
  today = new Date().toLocaleDateString();


    constructor(private service:InventoryService, private attendanceService: AttendanceService){
      this.attendanceIns$ = attendanceService.getAttendanceInToday();
    }

    ngOnInit():void{

    }

    check(attendance: any): void{
       console.log(attendance.employee);
    }



    resetAttendance(){
      this.attendanceService.remove();
    }
}
