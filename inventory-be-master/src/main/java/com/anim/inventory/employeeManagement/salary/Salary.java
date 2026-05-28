package com.anim.inventory.employeeManagement.salary;

import com.anim.inventory.employeeManagement.attendance.Attendance;
import com.anim.inventory.employeeManagement.employee.Employee;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double amount;
    private LocalDate paymentDate;
    private double workedHours;

    @ManyToOne
    private Employee employee;

    @OneToMany
    private List<Attendance> attendances;
}
