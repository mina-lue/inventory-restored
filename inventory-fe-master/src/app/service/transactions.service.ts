import { Injectable } from '@angular/core';
import { storeEndPoints, transactions } from './endpoints';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { RawMaterial } from '../model/RawMaterial.model';
import { NotificationService } from './notifications.service';
import { InventoryBalance } from '../model/InventoryBalance';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient, private readonly notification: NotificationService) {
  }

  getBalance(): Observable<any>{
    return this.http.get<InventoryBalance>(transactions.getBalance).pipe(
      catchError(() => of({ capital: 0, worth: 0 }))
    );
  }

  getMoneyIn(start:string, end:string): Observable<number>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<number>(transactions.getMoneyIn, {params}).pipe(catchError(() => of(0)));
  }

  getMoneyInTaxed(start:string, end:string): Observable<number>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<number>(transactions.getMoneyInTaxed, {params}).pipe(catchError(() => of(0)));
  }

  getMoneyOut(start:string, end:string): Observable<number>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<number>(transactions.getMoneyOut, {params}).pipe(catchError(() => of(0)));
  }

  getMoneyOutTaxed(start:string, end:string): Observable<number>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<number>(transactions.getMoneyOutTaxed, {params}).pipe(catchError(() => of(0)));
  }


  getAllTransactions(): Observable<any[]>{
    return forkJoin({
      sales: this.getProductsSold(),
      purchases: this.getRawMaterialsCollected(),
      assetExpenses: this.getAssetExpenses(),
      labourExpenses: this.getLabourExpenses(),
      otherExpenses: this.getOthers(),
      utilityExpenses: this.getUtilityPayments()
    }).pipe(
      map(({ sales, purchases, assetExpenses, labourExpenses, otherExpenses, utilityExpenses }) => [
        ...sales.map(sale => ({
          description: `${sale.product?.name ?? 'Product'} sale`,
          amount: sale.totalPrice,
          date: sale.saleDate
        })),
        ...purchases.map(purchase => ({
          description: `${purchase.material?.name ?? 'Material'} purchase`,
          amount: -purchase.totalPrice,
          date: purchase.purchaseDate
        })),
        ...assetExpenses.map(expense => ({
          description: expense.description ?? `${expense.asset?.name ?? 'Asset'} expense`,
          amount: -expense.amount,
          date: expense.expenseDate
        })),
        ...labourExpenses.map(expense => ({
          description: expense.description ?? `${expense.laborerName ?? 'Labour'} expense`,
          amount: -expense.amount,
          date: expense.expenseDate
        })),
        ...otherExpenses.map(expense => ({
          description: expense.description ?? 'Other expense',
          amount: -expense.amount,
          date: expense.expenseDate
        })),
        ...utilityExpenses.map(expense => ({
          description: expense.description ?? 'Utility expense',
          amount: -expense.amount,
          date: expense.expenseDate
        }))
      ])
    );
  }

  getAllTransactionsInDates(start:string, end:string): Observable<any[]>{
    return forkJoin({
      sales: this.getProductsSoldInDates(start, end),
      purchases: this.getRawMaterialsCollectedInDates(start, end),
      assetExpenses: this.getAssetExpensesInDates(start, end),
      labourExpenses: this.getLabourExpensesInDates(start, end),
      otherExpenses: this.getOthersInDates(start, end),
      utilityExpenses: this.getUtilityPaymentsInDates(start, end)
    }).pipe(
      map(({ sales, purchases, assetExpenses, labourExpenses, otherExpenses, utilityExpenses }) => [
        ...sales.map(sale => ({
          description: `${sale.product?.name ?? 'Product'} sale`,
          amount: sale.totalPrice,
          date: sale.saleDate
        })),
        ...purchases.map(purchase => ({
          description: `${purchase.material?.name ?? 'Material'} purchase`,
          amount: -purchase.totalPrice,
          date: purchase.purchaseDate
        })),
        ...assetExpenses.map(expense => ({
          description: expense.description ?? `${expense.asset?.name ?? 'Asset'} expense`,
          amount: -expense.amount,
          date: expense.expenseDate
        })),
        ...labourExpenses.map(expense => ({
          description: expense.description ?? `${expense.laborerName ?? 'Labour'} expense`,
          amount: -expense.amount,
          date: expense.expenseDate
        })),
        ...otherExpenses.map(expense => ({
          description: expense.description ?? 'Other expense',
          amount: -expense.amount,
          date: expense.expenseDate
        })),
        ...utilityExpenses.map(expense => ({
          description: expense.description ?? 'Utility expense',
          amount: -expense.amount,
          date: expense.expenseDate
        }))
      ])
    );
  }


  getProductsSold(): Observable<any[]>{
    return this.http.get<any[]>(transactions.getProducts).pipe(catchError(() => of([])));
  }

  getProductsSoldInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getProductSellsBetweenDates, {params}).pipe(catchError(() => of([])));
  }

  getRecentSales():Observable<any[]>{
    return this.http.get<any[]>(transactions.getRecentSales).pipe(catchError(() => of([])));
  }
  getAgedItems():Observable<any[]>{
    return this.http.get<any[]>(storeEndPoints.getAgedItems).pipe(catchError(() => of([])));
  }

  getRawMaterialsCollected(): Observable<any[]>{
    return this.http.get<any[]>(transactions.materials).pipe(catchError(() => of([])));
  }

  getRawMaterialsCollectedInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getMaterialsBetweenDates, {params}).pipe(catchError(() => of([])));
  }

  getLabourExpenses(): Observable<any[]>{
    return this.http.get<any[]>(transactions.labourExpenses).pipe(catchError(() => of([])));
  }

  getLabourExpensesInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getLabourExpensesBetweenDates, {params}).pipe(catchError(() => of([])));
  }

  getAssetExpenses(): Observable<any[]>{
    return this.http.get<any[]>(transactions.assetExpenses).pipe(catchError(() => of([])));
  }

  getAssetExpensesInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getAssetExpensesBetweenDates, {params}).pipe(catchError(() => of([])));
  }

  getOthers(): Observable<any[]>{
    return this.http.get<any[]>(transactions.others).pipe(catchError(() => of([])))
  }

  getOthersInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getOthersBetweenDates, {params}).pipe(catchError(() => of([])));
  }

  getUtilityPayments(): Observable<any[]>{
    return this.http.get<any[]>(transactions.utilities).pipe(catchError(() => of([])));
  }

  getUtilityPaymentsInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getUtilitiesBetweenDates, {params}).pipe(catchError(() => of([])));
  }



  addProductSold(data: any, onSuccess?: () => void): void{
    this.http.post<any>(transactions.addProductSold,data ).subscribe({
      next: response => {
        this.notification.showNotification(true, `${data.quantity} ${data.product.unit} ${data.product.name} sales registered successfully!`);
        onSuccess?.();
      },
      error: error => this.notification.showNotification(false, `${data.product.name} sale registration not successful!`)
    })
  }

  addLabourExpenses(expense: any, onSuccess?: () => void): void{
    this.http.post<any>(transactions.labourExpenses,expense ).subscribe({
      next: response => {
        this.notification.showNotification(true, `labour pay registered successfully!`);
        onSuccess?.();
      },
      error: error => this.notification.showNotification(false, `labour pay not successful!`)
    })
  }

  addAssetExpenses(expense: any, onSuccess?: () => void): void{
    this.http.post<any>(transactions.assetExpenses,expense ).subscribe({
      next: response => {
        this.notification.showNotification(true, `${expense.asset.name} expense added successfully!`);
        onSuccess?.();
      },
      error: error => this.notification.showNotification(false, `Asset expense registration not successful!`)
    })
  }

  addOtherExpenses(expense: any, onSuccess?: () => void): void{
    this.http.post<any>(transactions.others ,expense ).subscribe({
      next: response => {
        this.notification.showNotification(true, `Expense added successfully!`);
        onSuccess?.();
      },
      error: error => this.notification.showNotification(false, `Expense registration not successful!`)
    })
  }

  addMaterialInStore(materials: any, onSuccess?: () => void){
    return this.http.post(`${transactions.materials}`, materials).subscribe({
      next: response => {
        this.notification.showNotification(true, `Raw materials added successfully!`);
        onSuccess?.();
      },
      error: error => this.notification.showNotification(false, `Raw material add not successful!`)
    })
  }

  addUtilityPayment(materials: any, onSuccess?: () => void){
    return this.http.post(`${transactions.utilities}`, materials).subscribe({
      next: response => {
        this.notification.showNotification(true, `Utility payment added successfully!`);
        onSuccess?.();
      },
      error: error => this.notification.showNotification(false, `Utility payment registration not successful!`)
    })
  }

  addSalariesPay(salaries: any[], onSuccess?: () => void) {
    return this.http.post(`${transactions.addSalaries}`, salaries).subscribe({
      next: response => {
        this.notification.showNotification(true, `salary pays registered successfully!`);
        onSuccess?.();
      },
      error: error => this.notification.showNotification(false, `salary pay not successful!`)
    })
  }

}
