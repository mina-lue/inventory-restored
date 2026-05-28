package com.anim.inventory.employeeManagement.attendance;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public List<Attendance> getTodaysAttendance() {
        return attendanceRepository.findByDate(LocalDate.now());
    }

    public List<Attendance> getByEmployeeId(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }

    public List<Attendance> saveAllAttendanceIn(List<Attendance> attendance) {
        return attendanceRepository.saveAll(attendance);
    }

    public Attendance saveAttendance(Attendance attendance) {
        Attendance attendanceSaved = attendanceRepository.findByEmployeeIdAndDate(attendance.getEmployee().getId(), LocalDate.now());
        if (attendanceSaved == null) {
            attendanceRepository.save(attendance);
        } else {
            attendanceSaved.setTimeIn(LocalDateTime.now());
            attendanceRepository.save(attendanceSaved);
        }
        return attendanceSaved;
    }

    public Attendance update(Attendance attendance) {
        Attendance attendance1 = attendanceRepository.findById(attendance.getId()).get();
        if (attendance1 != null) {
         return   attendanceRepository.save(attendance);
        }
        return null;
    }

    @Transactional
    public boolean reset() {
        List<Attendance> attendances = getTodaysAttendance();
        attendanceRepository.deleteAll(attendances);
        return true;
    }

    public void deleteAttendance(Long attendanceId) {
        attendanceRepository.deleteById(attendanceId);
    }
}
