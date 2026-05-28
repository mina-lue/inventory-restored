package com.anim.inventory.employeeManagement.salary;

import com.anim.inventory.employeeManagement.attendance.Attendance;
import com.anim.inventory.employeeManagement.attendance.AttendanceRepository;
import com.anim.inventory.employeeManagement.employee.Employee;
import com.anim.inventory.employeeManagement.employee.EmployeeRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SalaryService {
    private final SalaryRepository salaryRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;

    public List<Salary> calculateSalary() {
        List<Employee> employees = employeeRepository.findAll();
        List<Salary> salaries = new ArrayList<>();
        Pageable pageable = PageRequest.of(0, 30, Sort.by(Sort.Direction.DESC, "date"));

        employees.forEach(emp ->{
            Salary salary = new Salary();
            salary.setEmployee(emp);
            Page<Attendance> PageAttendances = attendanceRepository.findByEmployeeId(emp.getId(), pageable);
            List<Attendance> attendances = PageAttendances.getContent();
            double totalHours = attendances.stream().mapToDouble(Attendance::getWorkHours).sum();
            double totalSalary = totalHours/60 * emp.getSalary()/180;
            salary.setAmount(totalSalary);
            salary.setPaymentDate(LocalDate.now());
            salary.setWorkedHours(totalHours/60);
            salary.setAttendances(attendances);
            salaries.add(salary);
        });
    return salaries;
    }

    public Salary pay(Salary salary) {
        return salaryRepository.save(salary);
    }

    public List<Salary> payAll(List<Salary> salaries) {
        return salaryRepository.saveAll(salaries);
    }

    public List<Salary> getAll() {
        return salaryRepository.findAll();
    }
}
