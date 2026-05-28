import { Employee } from "./employee.model";

export interface Attendance{
  checked:boolean;
	employee: any,
}

export interface AttendanceIn{
  checked:boolean;
  employee: Employee,
	date?: string,
  inTime?: Date,
}
