import { Injectable } from '@angular/core';
import { storeEndPoints, transactions } from './endpoints';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<InventoryBalance>(transactions.getBalance);
  }

  getMoneyIn(start:string, end:string): Observable<number>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<number>(transactions.getMoneyIn, {params});
  }

  getMoneyInTaxed(start:string, end:string): Observable<number>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<number>(transactions.getMoneyInTaxed, {params});
  }

  getMoneyOut(start:string, end:string): Observable<number>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<number>(transactions.getMoneyOut, {params});
  }

  getMoneyOutTaxed(start:string, end:string): Observable<number>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<number>(transactions.getMoneyOutTaxed, {params});
  }


  getAllTransactions(): Observable<any[]>{
    return this.http.get<any[]>(transactions.getAll);
  }

  getAllTransactionsInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getAllBetweenDates, {params});
  }


  getProductsSold(): Observable<any[]>{
    return this.http.get<any[]>(transactions.getProducts);
  }

  getProductsSoldInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getProductSellsBetweenDates, {params});
  }

  getRecentSales():Observable<any[]>{
    return this.http.get<any[]>(transactions.getRecentSales);
  }
  getAgedItems():Observable<any[]>{
    return this.http.get<any[]>(storeEndPoints.getAgedItems);
  }

  getRawMaterialsCollected(): Observable<any[]>{
    return this.http.get<any[]>(transactions.materials);
  }

  getRawMaterialsCollectedInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getMaterialsBetweenDates, {params});
  }

  getLabourExpenses(): Observable<any[]>{
    return this.http.get<any>(transactions.labourExpenses);
  }

  getLabourExpensesInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getLabourExpensesBetweenDates, {params});
  }

  getAssetExpenses(): Observable<any[]>{
    return this.http.get<any>(transactions.assetExpenses);
  }

  getAssetExpensesInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getAssetExpensesBetweenDates, {params});
  }

  getOthers(): Observable<any[]>{
    return this.http.get<any>(transactions.others)
  }

  getOthersInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getOthersBetweenDates, {params});
  }

  getUtilityPayments(): Observable<any[]>{
    return this.http.get<any>(transactions.utilities);
  }

  getUtilityPaymentsInDates(start:string, end:string): Observable<any[]>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(transactions.getUtilitiesBetweenDates, {params});
  }



  addProductSold(data: any): void{
    this.http.post<any>(transactions.addProductSold,data ).subscribe({
      next: response => this.notification.showNotification(true, `${data.quantity} ${data.product.unit} ${data.product.name} sales registered successfully!`),
      error: error => this.notification.showNotification(false, `${data.product.name} sale registration not successful!`)
    })
  }

  addLabourExpenses(expense: any): void{
    this.http.post<any>(transactions.labourExpenses,expense ).subscribe({
      next: response => this.notification.showNotification(true, `labour pay registered successfully!`),
      error: error => this.notification.showNotification(false, `labour pay not successful!`)
    })
  }

  addAssetExpenses(expense: any): void{
    this.http.post<any>(transactions.assetExpenses,expense ).subscribe({
      next: response => this.notification.showNotification(true, `${expense.asset.name} expense added successfully!`),
      error: error => this.notification.showNotification(false, `Asset expense registration not successful!`)
    })
  }

  addOtherExpenses(expense: any): void{
    this.http.post<any>(transactions.others ,expense ).subscribe({
      next: response => this.notification.showNotification(true, `Expense added successfully!`),
      error: error => this.notification.showNotification(false, `Expense registration not successful!`)
    })
  }

  addMaterialInStore(materials: any){
    return this.http.post(`${transactions.materials}`, materials).subscribe({
      next: response => this.notification.showNotification(true, `Raw materials added successfully!`),
      error: error => this.notification.showNotification(false, `Raw material add not successful!`)
    })
  }

  addUtilityPayment(materials: any){
    return this.http.post(`${transactions.utilities}`, materials).subscribe({
      next: response => this.notification.showNotification(true, `Utility payment added successfully!`),
      error: error => this.notification.showNotification(false, `Utility payment registration not successful!`)
    })
  }

  addSalariesPay(salaries: any[]) {
    return this.http.post(`${transactions.addSalaries}`, salaries).subscribe({
      next: response => this.notification.showNotification(true, `salary pays registered successfully!`),
      error: error => this.notification.showNotification(false, `salary pay not successful!`)
    })
  }
}
