import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { reports } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getInventoryValuation(): Observable<any> {
    return this.http.get<any>(reports.inventoryValuation).pipe(catchError(() => of({ productValue: 0, materialValue: 0, totalValue: 0, items: [] })));
  }

  getLowStock(): Observable<any[]> {
    return this.http.get<any[]>(reports.lowStock).pipe(catchError(() => of([])));
  }

  getProfitByProduct(): Observable<any[]> {
    return this.http.get<any[]>(reports.profitByProduct).pipe(catchError(() => of([])));
  }

  getSales(): Observable<any[]> {
    return this.http.get<any[]>(reports.sales).pipe(catchError(() => of([])));
  }

  getMaterialConsumption(): Observable<any[]> {
    return this.http.get<any[]>(reports.materialConsumption).pipe(catchError(() => of([])));
  }

  getExpenseBreakdown(): Observable<any[]> {
    return this.http.get<any[]>(reports.expenseBreakdown).pipe(catchError(() => of([])));
  }

  getStockMovements(): Observable<any[]> {
    return this.http.get<any[]>(reports.stockMovements).pipe(catchError(() => of([])));
  }
}
