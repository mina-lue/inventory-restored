package com.anim.inventory.employeeManagement.salary;

import com.anim.inventory.employeeManagement.employee.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SalaryRepository extends JpaRepository<Salary, Long> {
}
