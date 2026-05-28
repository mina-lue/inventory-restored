package com.anim.inventory.transaction.expenses;

import com.anim.inventory.transaction.expenses.entity.AssetExpense;
import com.anim.inventory.transaction.expenses.entity.LabourExpense;
import com.anim.inventory.transaction.expenses.entity.OtherExpenses;
import com.anim.inventory.transaction.expenses.entity.UtilityExpense;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/expenses")
public class ExpenseController {

    private final ExpensesService expensesService;

    public ExpenseController(ExpensesService expensesService) {
        this.expensesService = expensesService;
    }

    @GetMapping("assets")
    public ResponseEntity<List<AssetExpense>> getAssetExpenses(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ){
        List<AssetExpense> expenses = expensesService.listAssetExpenses(startDate, endDate);
        if(expenses == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("utility")
    public ResponseEntity<List<UtilityExpense>> getUtilityExpenses(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ){
        List<UtilityExpense> expenses = expensesService.listUtilityExpenses(startDate, endDate);
        if(expenses == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("others")
    public ResponseEntity<List<OtherExpenses>> getOtherExpenses(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ){
        List<OtherExpenses> expenses = expensesService.listOtherExpenses(startDate, endDate);
        if(expenses == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("labours")
    public ResponseEntity<List<LabourExpense>> getLabourExpenses(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ){
        List<LabourExpense> expenses = expensesService.listLabourExpenses(startDate, endDate);
        if(expenses == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(expenses);
    }

    @PostMapping("assets")
    public ResponseEntity<AssetExpense> saveAssetExpense(@RequestBody AssetExpense assetExpense){
        AssetExpense expense = expensesService.saveAssetExpense(assetExpense);
        if (expense == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.created(URI.create("assets")).body(expense);
    }

    @PostMapping("utility")
    public ResponseEntity<UtilityExpense> saveUtilityExpense(@RequestBody UtilityExpense utilityExpense){
        UtilityExpense expense = expensesService.saveUtilityExpense(utilityExpense);
        if (expense == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.created(URI.create("utility")).body(expense);
    }

    @PostMapping("others")
    public ResponseEntity<OtherExpenses> saveOtherExpenses(@RequestBody OtherExpenses otherExpenses){
        OtherExpenses expense = expensesService.saveOtherExpenses(otherExpenses);
        if (expense == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.created(URI.create("others")).body(expense);
    }

    @PostMapping("labours")
    public ResponseEntity<LabourExpense> saveOtherExpenses(@RequestBody LabourExpense labourExpense){
        LabourExpense expense = expensesService.saveLabourExpenses(labourExpense);
        if (expense == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.created(URI.create("labours")).body(expense);
    }
}
