package com.anim.inventory.employeeManagement.attendance;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController()
@RequestMapping("api/v1/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/today")
    public ResponseEntity<List<Attendance>> findTodaysAttendance() {
        List<Attendance> todays = attendanceService.getTodaysAttendance();
        if (todays.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(todays);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Attendance>> findByEmployeeId(@PathVariable("id") Long id) {
        List<Attendance> employeeAttendance = attendanceService.getByEmployeeId(id);
        if (employeeAttendance.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(employeeAttendance);
    }

    @PostMapping("/in")
    public ResponseEntity<Attendance> createAttendance(@RequestBody Attendance attendance) {
        Attendance att = attendanceService.saveAttendance(attendance);
        if (att == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(att);
    }

    @PostMapping("/out")
    public ResponseEntity<Attendance> updateAttendance(@RequestBody Attendance attendance) {
        Attendance attOut = attendanceService.update(attendance);
        if (attOut == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(attOut);
    }

    @PostMapping("/in-all")
    public ResponseEntity<List<Attendance>> registerAttendanceIn(@RequestBody List<Attendance> attendanceList) {
        List<Attendance> attendancesSaved = attendanceService.saveAllAttendanceIn(attendanceList);
        if (attendancesSaved.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(attendancesSaved);
    }

    @PostMapping("/out-all")
    public ResponseEntity<List<Attendance>> registerAttendanceOut(@RequestBody List<Attendance> attendanceList) {
        attendanceList.forEach(attendance -> {
            attendance.setTimeOut(LocalDateTime.now());
            double wh = attendance.getTimeOut().getMinute() - attendance.getTimeIn().getMinute();
            attendance.setWorkHours(wh);
        });
        List<Attendance> attendancesSaved = attendanceService.saveAllAttendanceIn(attendanceList);
        if (attendancesSaved.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(attendancesSaved);
    }

    @DeleteMapping("/reset")
    public ResponseEntity<Boolean> resetAttendance() {
        attendanceService.reset();
        return ResponseEntity.ok(true);
    }

}