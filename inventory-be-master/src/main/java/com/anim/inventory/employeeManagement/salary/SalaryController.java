package com.anim.inventory.employeeManagement.salary;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/salary")
public class SalaryController {

    private final SalaryService salaryService;

    public SalaryController(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @GetMapping("/calculate")
    public ResponseEntity<List<Salary>> allToBePaid(){
        return ResponseEntity.ok().body(salaryService.calculateSalary());
    }

    @PostMapping("/pay")
    public ResponseEntity<Salary> paySalary(@RequestBody Salary salary){
        Salary saved = salaryService.pay(salary);
        if(saved != null){
            return ResponseEntity.ok().body(saved);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/pay-all")
    public ResponseEntity<List<Salary>> payAllSalary(@RequestBody List<Salary> salaries){
        List<Salary> allSaved = salaryService.payAll(salaries);
        if(allSaved != null){
            return ResponseEntity.ok().body(allSaved);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping
    public ResponseEntity<List<Salary>> findAll(){
        List<Salary> ss = salaryService.getAll();
    if(ss != null){
        return ResponseEntity.ok().body(ss);
    }
    return ResponseEntity.badRequest().build();
    }
}
