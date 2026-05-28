package com.anim.inventory.transaction.expenses;

import com.anim.inventory.store.BalanceService;
import com.anim.inventory.transaction.expenses.entity.AssetExpense;
import com.anim.inventory.transaction.expenses.entity.LabourExpense;
import com.anim.inventory.transaction.expenses.entity.OtherExpenses;
import com.anim.inventory.transaction.expenses.entity.UtilityExpense;
import com.anim.inventory.transaction.expenses.repository.AssetExpenseRepository;
import com.anim.inventory.transaction.expenses.repository.LabourExpenseRepository;
import com.anim.inventory.transaction.expenses.repository.OtherExpensesRepository;
import com.anim.inventory.transaction.expenses.repository.UtilityExpenseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Component
public class ExpensesService {

    private final AssetExpenseRepository assetExpenseRepository;
    private final UtilityExpenseRepository utilityExpenseRepository;
    private final OtherExpensesRepository otherExpensesRepository;
    private final BalanceService balanceService;
    private final LabourExpenseRepository labourExpenseRepository;

    public ExpensesService(AssetExpenseRepository assetExpenseRepository,
                           UtilityExpenseRepository utilityExpenseRepository,
                           OtherExpensesRepository otherExpensesRepository,
                           BalanceService balanceService, LabourExpenseRepository labourExpenseRepository) {
        this.assetExpenseRepository = assetExpenseRepository;
        this.utilityExpenseRepository = utilityExpenseRepository;
        this.otherExpensesRepository = otherExpensesRepository;
        this.balanceService = balanceService;
        this.labourExpenseRepository = labourExpenseRepository;
    }

    public AssetExpense saveAssetExpense(AssetExpense assetExpense) {
        balanceService.changeBalance(-assetExpense.getAmount());
        AssetExpense expense = assetExpenseRepository.save(assetExpense);
        return expense;
    }

    public UtilityExpense saveUtilityExpense(UtilityExpense utilityExpense) {
        balanceService.changeBalance(-utilityExpense.getAmount());
        UtilityExpense expense = utilityExpenseRepository.save(utilityExpense);
        return expense;
    }

    public OtherExpenses saveOtherExpenses(OtherExpenses otherExpenses) {
        balanceService.changeBalance(-otherExpenses.getAmount());
        OtherExpenses expense = otherExpensesRepository.save(otherExpenses);
        return expense;
    }

    public LabourExpense saveLabourExpenses(LabourExpense labourExpense) {
        balanceService.changeBalance(-labourExpense.getAmount());
        LabourExpense expense = labourExpenseRepository.save(labourExpense);
        return expense;
    }

    public List<AssetExpense> listAssetExpenses() {
        List<AssetExpense> assetExpenses = assetExpenseRepository.findAll();
        return assetExpenses;
    }

    public List<AssetExpense> listAssetExpenses(String startDate, String endDate) {
        if (startDate != null && endDate != null) {
            LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
            LocalDateTime end = LocalDate.parse(endDate).atTime(LocalTime.MAX);
            return assetExpenseRepository.findByExpenseDateBetween(start, end);
        }
        List<AssetExpense> assetExpenses = assetExpenseRepository.findAll();
        return assetExpenses;
    }

    public List<UtilityExpense> listUtilityExpenses() {
        List<UtilityExpense> utilityExpenses = utilityExpenseRepository.findAll();
        return utilityExpenses;
    }

    public List<UtilityExpense> listUtilityExpenses(String startDate, String endDate) {
        if (startDate != null && endDate != null) {
            LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
            LocalDateTime end = LocalDate.parse(endDate).atTime(LocalTime.MAX);
            return utilityExpenseRepository.findByExpenseDateBetween(start, end);
        }
        List<UtilityExpense> utilityExpenses = utilityExpenseRepository.findAll();
        return utilityExpenses;
    }

    public List<OtherExpenses> listOtherExpenses() {
        List<OtherExpenses> otherExpenses = otherExpensesRepository.findAll();
        return otherExpenses;
    }

    public List<OtherExpenses> listOtherExpenses(String startDate, String endDate) {
        if (startDate != null && endDate != null) {
            LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
            LocalDateTime end = LocalDate.parse(endDate).atTime(LocalTime.MAX);
            return otherExpensesRepository.findByExpenseDateBetween(start, end);
        }
        List<OtherExpenses> otherExpenses = otherExpensesRepository.findAll();
        return otherExpenses;
    }

    public List<LabourExpense> listLabourExpenses() {
        List<LabourExpense> labourExpenses = labourExpenseRepository.findAll();
        return labourExpenses;
    }

    public List<LabourExpense> listLabourExpenses(String startDate, String endDate) {
        if (startDate != null && endDate != null) {
            LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
            LocalDateTime end = LocalDate.parse(endDate).atTime(LocalTime.MAX);
            return labourExpenseRepository.findByExpenseDateBetween(start, end);
        }
        List<LabourExpense> labourExpenses = labourExpenseRepository.findAll();
        return labourExpenses;
    }

}
