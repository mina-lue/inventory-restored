import { Injectable } from '@angular/core';
import { attendances, storeEndPoints } from './endpoints';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AttendanceIn } from '../model/attendance.model';
import { Observable } from 'rxjs';
import { NotificationService } from './notifications.service';
import { formatDate } from '../lib/DateFormatter';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient, private readonly notification: NotificationService) { }

  addAttendanceIn(employee:any){

    // TODO
    // need to resolve redundant attendance in problem!

    const att = {
      employee: employee
    }
       this.http.post<any>(attendances.addAttendanceIn, att).subscribe({
        next: response => this.notification.showNotification(true, `Attendance in registered successfully!`),
        error: error => this.notification.showNotification(false, `Attendance registration not successful!`)
    })
   console.log(employee);
    }

    getAttendanceInToday(): Observable<any[]>{
      return this.http.get<AttendanceIn[]>(attendances.getAttendances);
    }

    removeIn(): void{
      this.http.delete<any>(attendances.resetAttendanceIn).subscribe({
        next: response => this.notification.showNotification(true, `Attendance reset successfully!`),
        error: error => this.notification.showNotification(false, `Attendance reset not successful!`)
  })
    }


    addAttendanceOut(myAttendances:any){

         this.http.post<any>(attendances.addAttendanceOut, myAttendances).subscribe({
          next: response => this.notification.showNotification(true, `Attendance registered successfully!`),
          error: error => this.notification.showNotification(false, `Attendance registration not successful!`)
    })
      }





      remove(): void{
        this.http.delete<any>(attendances.removeAttendance).subscribe({
          next: response => this.notification.showNotification(true, `Attendance reset successfully!`),
          error: error => this.notification.showNotification(false, `Attendance reset not successful!`)
    })
      }

      getEmployeeAttendance(empId:string, start: any, end: any){
         const params = new HttpParams()
            .set("startDate", formatDate(start))
            .set("endDate", formatDate(end))
            .set("empId", empId)

            return this.http.get<any[]>(attendances.getEmployeeAttendance, {params});
      }

      getAttendanceHours(start: any, end: any){
        const params = new HttpParams()
           .set("startDate", formatDate(start))
           .set("endDate", formatDate(end))

           return this.http.get<any[]>(attendances.getAttendanceHours, {params});
     }

}
