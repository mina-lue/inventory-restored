import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { combineLatest, forkJoin, map, Observable, of } from 'rxjs';
import { TransactionsService } from '../../service/transactions.service';
import { formatDate } from '../../lib/DateFormatter';
import { InventoryService } from '../../service/store-service.service';
import { InventoryBalance } from '../../model/InventoryBalance';
import { ReorderSuggestion } from '../../model/ReorderSuggestion.model';
import { DateRangeSelectComponent, DateRangePreset, getDateRangeForPreset } from '../lib/date-range-select/date-range-select.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NzIconModule, NzCardModule, NzDropDownModule, CommonModule, DateRangeSelectComponent, NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  products: any[] = [];
  sells: any[] = [];
  moneyIn$!: Observable<number>;
  moneyInTaxed$: Observable<number>| undefined;;
  moneyInTaxed: number=0;
  moneyInTax:number=0;
  moneyInUnTaxed:number = 0;
  unpaidTax: number = 0;
  afterTax: number = 0;
  moneyOut$!: Observable<number>;
  moneyOut: number = 0;
  moneyOutTaxed$: Observable<number>| undefined;
  moneyOutTaxed: number = 0;
  totalUntaxedOut:number = 0;
  balance$: Observable<InventoryBalance>;
  productsInStore$: Observable<any>;
  customersCount$: Observable<number>;
  productsCount$: Observable<number>;
  employeesCount$: Observable<number>;
  assetsCount$: Observable<number>;
  productsMostSold$: Observable<any>;
  recentSales$: Observable<any>;
  productsMostAged$: Observable<any>
  productsSold$!: Observable<any>;
  productions$!: Observable<any>;
  lowStockProducts$: Observable<any[]>;
  lowStockMaterials$: Observable<any[]>;
  reorderSuggestions$: Observable<ReorderSuggestion[]>;
  revenueExpenseChartOptions: any = {
    series: [],
    chart: { type: 'line', height: 320, toolbar: { show: false } },
    colors: ['#16a34a', '#2563eb', '#f97316'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [3, 3, 3] },
    markers: { size: 3 },
    xaxis: { categories: [] },
    yaxis: {},
    tooltip: { shared: true, intersect: false },
    legend: { position: 'top' },
    grid: { borderColor: '#e2e8f0' }
  };
  productionSalesChartOptions: any = {
    series: [],
    chart: { type: 'bar', height: 320, toolbar: { show: false }, stacked: false },
    colors: ['#0f766e', '#9a3412'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 4
      }
    },
    dataLabels: { enabled: false },
    stroke: { width: 2, colors: ['transparent'] },
    xaxis: { categories: [] },
    yaxis: {},
    tooltip: { shared: true, intersect: false },
    legend: { position: 'top' },
    grid: { borderColor: '#e2e8f0' }
  };
  profit = 0;
  dateRangePreset: DateRangePreset = 'week';


  startValue: Date = new Date();
  endValue: Date = new Date();

  constructor(private readonly transactionService: TransactionsService, private readonly storeService: InventoryService){
    const initialDateRange = getDateRangeForPreset(this.dateRangePreset);
    this.startValue = initialDateRange.start;
    this.endValue = initialDateRange.end;
    this.balance$ = transactionService.getBalance();
    this.productsInStore$ = storeService.getProducts({page:0,size:10 });
    this.customersCount$ = storeService.getCustomersCount();
    this.productsCount$ = storeService.getProductsCount();
    this.employeesCount$ = storeService.getEmployeesCount();
    this.assetsCount$ = storeService.getAssetsCount();
    this.productsMostSold$ = storeService.getProducts({page:0, size: 4});
    this.recentSales$ = transactionService.getRecentSales();
    this.productsMostAged$ = transactionService.getAgedItems();
    this.lowStockProducts$ = storeService.getLowStockProducts();
    this.lowStockMaterials$ = storeService.getLowStockMaterials();
    this.reorderSuggestions$ = combineLatest([
      storeService.getProductReorderSuggestions(),
      storeService.getMaterialReorderSuggestions()
    ]).pipe(map(([products, materials]) => [...products, ...materials]));
    this.loadDashboardData();
  }


  ngOnInit(): void {
  }

  refreshDateRangeData(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    const start = formatDate(this.startValue);
    const end = formatDate(this.endValue);

    forkJoin({
      transactions: this.transactionService.getAllTransactionsInDates(start, end),
      productions: this.storeService.getProductions(start, end),
      sales: this.transactionService.getProductsSoldInDates(start, end)
    }).subscribe(({ transactions, productions, sales }) => {
      const dailyRevenue = this.buildDailyFinanceSeries(transactions);
      const productionSales = this.buildProductionSalesSeries(productions, sales);

      this.revenueExpenseChartOptions = this.createRevenueExpenseChartOptions(dailyRevenue.labels, dailyRevenue.revenue, dailyRevenue.expenses, dailyRevenue.net);
      this.productionSalesChartOptions = this.createProductionSalesChartOptions(productionSales.labels, productionSales.productions, productionSales.sales);
      this.productions$ = of(productions);
      this.productsSold$ = of(sales);
      this.moneyIn$ = of(dailyRevenue.totalRevenue);
      this.moneyOut$ = of(dailyRevenue.totalExpenses);
      this.moneyOutTaxed$ = undefined;
      this.moneyInTaxed$ = undefined;
      this.profit = dailyRevenue.totalNet;
    });
  }

  private buildDailyFinanceSeries(transactions: any[]): { labels: string[]; revenue: number[]; expenses: number[]; net: number[]; totalRevenue: number; totalExpenses: number; totalNet: number } {
    const keys = this.buildDateKeys(this.startValue, this.endValue);
    const bucketMap = new Map<string, { revenue: number; expenses: number }>();

    keys.forEach(key => bucketMap.set(key, { revenue: 0, expenses: 0 }));

    transactions.forEach(transaction => {
      const key = this.toDateKey(transaction.date);
      const bucket = bucketMap.get(key);
      if (!bucket) {
        return;
      }

      const amount = Number(transaction.amount ?? 0);
      if (amount >= 0) {
        bucket.revenue += amount;
      } else {
        bucket.expenses += Math.abs(amount);
      }
    });

    const labels = keys.map(key => this.toChartLabel(key));
    const revenue = keys.map(key => bucketMap.get(key)?.revenue ?? 0);
    const expenses = keys.map(key => bucketMap.get(key)?.expenses ?? 0);
    const net = keys.map((key, index) => revenue[index] - expenses[index]);

    return {
      labels,
      revenue,
      expenses,
      net,
      totalRevenue: revenue.reduce((sum, value) => sum + value, 0),
      totalExpenses: expenses.reduce((sum, value) => sum + value, 0),
      totalNet: net.reduce((sum, value) => sum + value, 0)
    };
  }

  private buildProductionSalesSeries(productions: any[], sales: any[]): { labels: string[]; productions: number[]; sales: number[] } {
    const keys = this.buildDateKeys(this.startValue, this.endValue);
    const productionMap = new Map<string, number>();
    const salesMap = new Map<string, number>();

    keys.forEach(key => {
      productionMap.set(key, 0);
      salesMap.set(key, 0);
    });

    productions.forEach(production => {
      const key = this.toDateKey(production.productionDate ?? production.createdAt ?? production.date);
      if (!productionMap.has(key)) {
        return;
      }
      productionMap.set(key, (productionMap.get(key) ?? 0) + Number(production.quantity ?? 0));
    });

    sales.forEach(sale => {
      const key = this.toDateKey(sale.saleDate ?? sale.createdAt ?? sale.date);
      if (!salesMap.has(key)) {
        return;
      }
      salesMap.set(key, (salesMap.get(key) ?? 0) + Number(sale.quantity ?? 0));
    });

    return {
      labels: keys.map(key => this.toChartLabel(key)),
      productions: keys.map(key => productionMap.get(key) ?? 0),
      sales: keys.map(key => salesMap.get(key) ?? 0)
    };
  }

  private createRevenueExpenseChartOptions(labels: string[], revenue: number[], expenses: number[], net: number[]): any {
    return {
      series: [
        { name: 'Revenue', data: revenue },
        { name: 'Net', data: net },
        { name: 'Expenses', data: expenses }
      ],
      chart: {
        type: 'line',
        height: 320,
        toolbar: { show: false },
        animations: { enabled: true }
      },
      colors: ['#16a34a', '#2563eb', '#f97316'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: [3, 3, 3] },
      markers: { size: 3 },
      xaxis: { categories: labels, labels: { rotate: -35 } },
      yaxis: {
        labels: {
          formatter: (value: number) => `${Math.round(value)}`
        }
      },
      tooltip: { shared: true, intersect: false },
      legend: { position: 'top' },
      grid: { borderColor: '#e2e8f0' }
    };
  }

  private createProductionSalesChartOptions(labels: string[], productions: number[], sales: number[]): any {
    return {
      series: [
        { name: 'Productions', data: productions },
        { name: 'Sales', data: sales }
      ],
      chart: {
        type: 'bar',
        height: 320,
        toolbar: { show: false },
        stacked: false,
        animations: { enabled: true }
      },
      colors: ['#0f766e', '#9a3412'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          borderRadius: 4
        }
      },
      dataLabels: { enabled: false },
      stroke: { width: 2, colors: ['transparent'] },
      xaxis: { categories: labels, labels: { rotate: -35 } },
      yaxis: {
        labels: {
          formatter: (value: number) => `${Math.round(value)}`
        }
      },
      tooltip: { shared: true, intersect: false },
      legend: { position: 'top' },
      grid: { borderColor: '#e2e8f0' }
    };
  }

  private buildDateKeys(start: Date, end: Date): string[] {
    const keys: string[] = [];
    const cursor = new Date(start);
    cursor.setHours(0, 0, 0, 0);
    const limit = new Date(end);
    limit.setHours(0, 0, 0, 0);

    while (cursor <= limit) {
      keys.push(formatDate(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    return keys;
  }

  private toDateKey(value: any): string {
    if (!value) {
      return '';
    }
    if (typeof value === 'string') {
      return value.slice(0, 10);
    }
    if (value instanceof Date) {
      return formatDate(value);
    }
    return formatDate(new Date(value));
  }

  private toChartLabel(dateKey: string): string {
    const labelDate = new Date(`${dateKey}T00:00:00`);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(labelDate);
  }

}
