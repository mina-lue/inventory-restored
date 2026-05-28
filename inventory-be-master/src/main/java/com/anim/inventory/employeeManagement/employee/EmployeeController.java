package com.anim.inventory.employeeManagement.employee;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAll(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size) {
        Page<Employee> pageEmployees = employeeRepository.findAll(PageRequest.of(page, size));
        return pageEmployees.getContent();
    }

    @GetMapping("/count")
    public long count() {
        return employeeRepository.count();
    }

    @GetMapping("/{id}")
    public Employee get(@PathVariable Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @PostMapping
    public Employee save(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }
}
