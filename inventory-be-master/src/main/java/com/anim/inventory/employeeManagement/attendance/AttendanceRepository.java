package com.anim.inventory.employeeManagement.attendance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByDate(LocalDate date);
    List<Attendance> findByEmployeeId(Long employeeId);
    Attendance findByEmployeeIdAndDate(Long employeeId, LocalDate date);
    Page<Attendance> findByEmployeeId(Long employeeId, Pageable pageable);
}
