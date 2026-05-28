import { Injectable, model } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { storeEndPoints, models, transactions } from './endpoints';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Asset } from '../model/Asset.model';
import { RawMaterial } from '../model/RawMaterial.model';
import { Customer } from '../model/Customer.model';
import { Employee } from '../model/employee.model';
import { NotificationService } from './notifications.service';
import { Page } from '../model/Page';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient, private readonly notification: NotificationService){

  }

  getProductTypes(): Observable<Product[]>{
    return this.http.get<any[]>(models.getProductTypes);
  }

  getProducts(page:Page): Observable<Product[]>{
    const params = new HttpParams()
    .set("size", page.size)
    .set("page", page.page)
    return this.http.get<any[]>(storeEndPoints.products, {params});
  }

  getAssets(): Observable<any[]>{
    return this.http.get<any[]>(storeEndPoints.assets);
  }

  addAsset(asset : Asset){
    this.http.post<Asset>(storeEndPoints.assets, asset).subscribe({
     next: response => this.notification.showNotification(true, `${asset.name} registered successfully!`),
     error: error => this.notification.showNotification(false, `Asset registration not successful!`)
   })
 }


  getProductions(start:string, end:string): Observable<any>{
    const params = new HttpParams()
    .set("startDate", start)
    .set("endDate", end);
    return this.http.get<any[]>(storeEndPoints.getProductions, {params});
  }

  getCustomers(): Observable<Customer[]>{
    const params = new HttpParams()
    .set("page", 0)
    .set("size", 10);
    return this.http.get<Customer[]>(storeEndPoints.customers)
  }

  getMaterials(): Observable<any[]>{
    return this.http.get<any[]>(storeEndPoints.materials);
  }

  getEmployees():Observable<any[]>{
    return this.http.get<any[]>(storeEndPoints.employees);
  }

  getMaterialTypes(): Observable<RawMaterial[]>{
    return this.http.get<RawMaterial[]>(models.getMaterialTypes);
  }

  addProduct(product:Product){
     this.http.post<Product>(storeEndPoints.products, product).subscribe({
      next: response => this.notification.showNotification(true, `${product.name} registered successfully!`),
      error: error => this.notification.showNotification(false, `Product registration not successful!`)
    })
  }



  addMaterial(material: RawMaterial){
    return this.http.post<RawMaterial>(storeEndPoints.materials, material).subscribe({
      next: response => this.notification.showNotification(true, `${material.name} registered successfully!`),
      error: error => this.notification.showNotification(false, `Material registration not successful!`)
    })
  }

  addCustomer(customer :Customer){
    return this.http.post<Customer>(storeEndPoints.customers, customer).subscribe({
      next: response => this.notification.showNotification(true, `${customer.name} registered successfully!`),
      error: error => this.notification.showNotification(false, `Customer registration not successful!`)
    })
  }

  addEmployee(employee : Employee){
    return this.http.post<Employee>(storeEndPoints.employees, employee).subscribe({
      next: response => this.notification.showNotification(true, `${employee.name} registered successfully!`),
      error: error => this.notification.showNotification(false, `${employee.name} registration not successful!`)
    })
  }

  addMaterialConsumption(materialId: number, quantity: number){
    const params = {materialId: materialId, quantity: quantity}
    console.log(params);
    return this.http.post(`${storeEndPoints.addMaterialConsumption}?materialId=${materialId}&quantity=${quantity}`, {}).subscribe({
      next: response => this.notification.showNotification(true, `material consumption registered successfully!`),
      error: error => this.notification.showNotification(false, `material consumption registration not successful!`)
    })
  }

  addProductInStore(productInStore: any, quantity: number){
    return this.http.post(`${storeEndPoints.addProductProduction}?id=${productInStore.id}`, quantity).subscribe({
      next: response => this.notification.showNotification(true, `${quantity}${productInStore.product.measurementUnit} ${productInStore.product.name} added to store successfully!`),
      error: error => this.notification.showNotification(false, `${productInStore.name} registration not successful!`)
    })
  }




  personell = {
    total: 7,
    items: [
  {
    id: '1',
    name: 'Alice Johnson',
    position: 'Software Engineer',
    salary: 75000,
  },
  {
    id: '2',
    name: 'Bob Smith',
    position: 'Project Manager',
    salary: 85000,
  },
  {
    id: '3',
    name: 'Charlie Brown',
    position: 'UI/UX Designer',
    salary: 68000,
  },
  {
    id: '4',
    name: 'Diana Prince',
    position: 'Quality Analyst',
    salary: 60000,
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    position: 'DevOps Engineer',
    salary: 80000,
  },
  {
    id: '6',
    name: 'Fiona White',
    position: 'Business Analyst',
    salary: 70000,
  },
  {
    id: '7',
    name: 'George Carter',
    position: 'HR Manager',
    salary: 72000,
  },
]
  }

  demo = {
    total: 18,
    items: [
    {name: 'pum',
    price: 2000},
    {
      name: 'come',
      price: 3000
    },
    {name: 'pum',
      price: 2000},
      {
        name: 'come',
        price: 3000
      },
    {name: 'pum',
    price: 2000},
    {
      name: 'come',
      price: 3000
    },
    {name: 'pum',
    price: 2000},
    {
      name: 'come',
      price: 3000
    },
    {name: 'pum',
    price: 2000},
    {
      name: 'come',
      price: 3000
    },
    {name: 'pum',
    price: 2000},
    {
      name: 'come',
      price: 3000
    },
    {name: 'pum',
    price: 2000},
    {
      name: 'come',
      price: 3000
    },
    {name: 'pum',
    price: 2000},
    {
      name: 'come',
      price: 3000
    },
    {name: 'pum',
      price: 2000},
      {
        name: 'come',
        price: 3000
      },
  ]
}

empAttendance = {
  presents : 12,
  absents : 2,
  permits :2,
  detail :[
  { date: '01/01/25', status: 'present' },
  { date: '01/02/25', status: 'absent' },
  { date: '01/03/25', status: 'present' },
  { date: '01/04/25', status: 'permitted' },
  { date: '01/05/25', status: 'approved' },
  { date: '01/06/25', status: 'present' },
  { date: '01/07/25', status: 'absent' },
  { date: '01/08/25', status: 'present' },
  { date: '01/09/25', status: 'permitted' },
  { date: '01/10/25', status: 'approved' },
  { date: '01/11/25', status: 'present' },
  { date: '01/12/25', status: 'absent' },
  { date: '01/13/25', status: 'permitted' },
  { date: '01/14/25', status: 'approved' },
  { date: '01/15/25', status: 'present' },
  { date: '01/16/25', status: 'absent' },
  { date: '01/17/25', status: 'permitted' },
  { date: '01/18/25', status: 'approved' },
  { date: '01/19/25', status: 'present' },
  { date: '01/20/25', status: 'absent' },
  { date: '01/21/25', status: 'approved' },
  { date: '01/22/25', status: 'permitted' },
  { date: '01/23/25', status: 'present' },
  { date: '01/24/25', status: 'absent' },
  { date: '01/25/25', status: 'approved' },
  { date: '01/26/25', status: 'permitted' },
  { date: '01/27/25', status: 'present' },
  { date: '01/28/25', status: 'absent' },
  { date: '01/29/25', status: 'approved' },
  { date: '01/30/25', status: 'permitted' },
]
};

productsInStore = {
  total: 10,
  items: [
  {
    productName: 'Sugar',
    unitOfMeasure: 'kg',
    quantity: 10,
    unitPrice: 50,
    totalPrice: 500,
  },
  {
    productName: 'Flour',
    unitOfMeasure: 'kg',
    quantity: 25,
    unitPrice: 30,
    totalPrice: 750,
  },
  {
    productName: 'Milk',
    unitOfMeasure: 'liters',
    quantity: 5,
    unitPrice: 20,
    totalPrice: 100,
  },
  {
    productName: 'Rice',
    unitOfMeasure: 'kg',
    quantity: 50,
    unitPrice: 60,
    totalPrice: 3000,
  },
  {
    productName: 'Eggs',
    unitOfMeasure: 'dozen',
    quantity: 3,
    unitPrice: 120,
    totalPrice: 360,
  },
  {
    productName: 'Cooking Oil',
    unitOfMeasure: 'liters',
    quantity: 10,
    unitPrice: 150,
    totalPrice: 1500,
  },
  {
    productName: 'Butter',
    unitOfMeasure: 'grams',
    quantity: 500,
    unitPrice: 4,
    totalPrice: 2000,
  },
  {
    productName: 'Chicken',
    unitOfMeasure: 'kg',
    quantity: 20,
    unitPrice: 150,
    totalPrice: 3000,
  },
  {
    productName: 'Soap',
    unitOfMeasure: 'bars',
    quantity: 15,
    unitPrice: 40,
    totalPrice: 600,
  },
  {
    productName: 'Toothpaste',
    unitOfMeasure: 'tubes',
    quantity: 10,
    unitPrice: 50,
    totalPrice: 500,
  },
]
};

transactionsAll = {
  total: 15,
  items: [
  { id: 'TXN001', description: 'Purchase of office supplies', transaction_amount: -500, date: '2025-01-01' },
  { id: 'TXN002', description: 'Client payment for project A', transaction_amount: 1500, date: '2025-01-02' },
  { id: 'TXN003', description: 'Refund to customer', transaction_amount: -200, date: '2025-01-03' },
  { id: 'TXN004', description: 'Payment for internet services', transaction_amount: -100, date: '2025-01-04' },
  { id: 'TXN005', description: 'Employee salary for December', transaction_amount: -3000, date: '2025-01-05' },
  { id: 'TXN006', description: 'Revenue from product sales', transaction_amount: 5000, date: '2025-01-06' },
  { id: 'TXN007', description: 'Utility bill payment', transaction_amount: -800, date: '2025-01-07' },
  { id: 'TXN008', description: 'Office rent payment', transaction_amount: -2500, date: '2025-01-08' },
  { id: 'TXN009', description: 'Purchase of raw materials', transaction_amount: -1200, date: '2025-01-09' },
  { id: 'TXN010', description: 'Travel expense reimbursement', transaction_amount: -450, date: '2025-01-10' },
  { id: 'TXN011', description: 'Client payment for project B', transaction_amount: 3000, date: '2025-01-11' },
  { id: 'TXN012', description: 'Donation received', transaction_amount: 700, date: '2025-01-12' },
  { id: 'TXN013', description: 'Repair and maintenance costs', transaction_amount: -600, date: '2025-01-13' },
  { id: 'TXN014', description: 'Advertising campaign expense', transaction_amount: -1100, date: '2025-01-14' },
  { id: 'TXN015', description: 'Miscellaneous income', transaction_amount: 400, date: '2025-01-15' },
]
}

utilityTransactions = {
  total:50,
  items:[
  {
    Description: 'Electricity usage for office',
    consumedBy: 'Main Office',
    date: new Date('2025-01-01'),
    amountInBirr: 1200,
    amountInUnits: '450 kWh',
  },
  {
    Description: 'Water usage for production',
    consumedBy: 'Factory',
    date: new Date('2025-01-02'),
    amountInBirr: 800,
    amountInUnits: '15,000 liters',
  },
  {
    Description: 'Internet services',
    consumedBy: 'IT Department',
    date: new Date('2025-01-03'),
    amountInBirr: 600,
    amountInUnits: 'Unlimited Plan',
  },
  {
    Description: 'Fuel consumption for delivery',
    consumedBy: 'Logistics',
    date: new Date('2025-01-04'),
    amountInBirr: 1500,
    amountInUnits: '200 liters',
  },
  {
    Description: 'Paper consumption for printing',
    consumedBy: 'Admin Office',
    date: new Date('2025-01-05'),
    amountInBirr: 250,
    amountInUnits: '5 reams',
  },
  {
    Description: 'Gas usage for canteen',
    consumedBy: 'Cafeteria',
    date: new Date('2025-01-06'),
    amountInBirr: 400,
    amountInUnits: '30 kg',
  },
  {
    Description: 'Stationery for meetings',
    consumedBy: 'HR Department',
    date: new Date('2025-01-07'),
    amountInBirr: 350,
    amountInUnits: 'Assorted Items',
  },
  {
    Description: 'Oil consumption for machinery',
    consumedBy: 'Production Unit',
    date: new Date('2025-01-08'),
    amountInBirr: 1100,
    amountInUnits: '50 liters',
  },
  {
    Description: 'Printing costs for marketing materials',
    consumedBy: 'Marketing Department',
    date: new Date('2025-01-09'),
    amountInBirr: 950,
    amountInUnits: '10,000 copies',
  },
  {
    Description: 'Cleaning supplies for premises',
    consumedBy: 'Maintenance',
    date: new Date('2025-01-10'),
    amountInBirr: 300,
    amountInUnits: '20 kg',
  },
]
}

}
