package com.anim.inventory.employeeManagement.attendance;

import com.anim.inventory.employeeManagement.employee.Employee;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Employee employee;
    private LocalDate date;
    private LocalDateTime timeIn;
    private LocalDateTime timeOut;
    private Double workHours;

    @PrePersist
    protected void onCreate() {
        this.date = LocalDate.now();
        this.timeIn = LocalDateTime.now();
        this.workHours = 0.0;
    }
}
