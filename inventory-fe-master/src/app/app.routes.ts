import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductsComponent } from './pages/products/products.component';
import { AssetRegistrationComponent } from './pages/registration/asset-registration/asset-registration.component';
import { CustomerRegistrationComponent } from './pages/registration/customer-registration/customer-registration.component';
import { RawMaterialRegistrationComponent } from './pages/registration/raw-material-registration/raw-material-registration.component';
import { ProductRegistationComponent } from './pages/registration/product-registration/product-registration.component';
import { TransactionsAllComponent } from './pages/transactions/transactions-all/transactions-all.component';
import { OtherExpensesComponent } from './pages/transactions/other-expenses/other-expenses.component';
import { ProductsOutComponent } from './pages/transactions/products-out/products-out.component';
import { RawMaterialsInComponent } from './pages/transactions/raw-materials-in/raw-materials-in.component';
import { UtilityPayComponent } from './pages/transactions/utility-pay/utility-pay.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { SellComponent } from './pages/sell/sell.component';
import { RawMaterialsStoreComponent } from './pages/raw-materials-store/raw-materials-store.component';
import { AssetExpensesComponent } from './pages/transactions/asset-expenses/asset-expenses.component';
import { LabourExpensesComponent } from './pages/transactions/labour-expenses/labour-expenses.component';
import { SalaryComponent } from './pages/expenses/salary/salary.component';
import { LabourComponent } from './pages/expenses/labour/labour.component';
import { MaterialCollectComponent } from './pages/expenses/material-collect/material-collect.component';
import { OtherComponent } from './pages/expenses/other/other.component';
import { UtilityComponent } from './pages/expenses/utility/utility.component';
import { AssetComponent } from './pages/expenses/asset/asset.component';
import { ProductComponent } from './pages/production/product/product.component';
import { MaterialConsumptionComponent } from './pages/production/material-consumption/material-consumption.component';
import { AttendanceInComponent } from './pages/attendance/attendance-in/attendance-in.component';
import { AttendanceOutComponent } from './pages/attendance/attendance-out/attendance-out.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ProductItemsComponent } from './pages/product-items/product-items.component';
import { EmployeeRegistrationComponent } from './pages/registration/employee-registration/employee-registration.component';

export const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
      {
        path:'home/customers',
        component: CustomersComponent
      },
      {
        path:'home/employees',
        component: EmployeesComponent
      },
      {
        path:'home/product-items',
        component: ProductItemsComponent
      },
  {
    path:'store',
    component: StoreComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'register/asset',
    component: AssetRegistrationComponent
  },
  {
    path: 'register/customer',
    component: CustomerRegistrationComponent
  },
  {
    path: 'register/product',
    component: ProductRegistationComponent
  },
  {
    path: 'register/raw-material',
    component: RawMaterialRegistrationComponent
  },
  {
    path: 'register/employee',
    component: EmployeeRegistrationComponent
  },
  {
    path: 'transactions/all',
    component: TransactionsAllComponent
  },
  {
    path: 'transactions/other-expenses',
    component: OtherExpensesComponent
  },
  {
    path: 'transactions/products-out',
    component: ProductsOutComponent
  },
  {
    path: 'transactions/raw-materials-in',
    component: RawMaterialsInComponent
  },
  {
    path: 'transactions/utility-expenses',
    component: UtilityPayComponent
  },
  {
    path: 'transactions/labour-expenses',
    component: LabourExpensesComponent
  },
  {
    path: 'transactions/assets-expenses',
    component: AssetExpensesComponent
  },
  {
    path: 'store/assets',
    component: AssetsComponent
  },
  {
    path: 'store/products',
    component: ProductsComponent
  },
  {
    path: 'store/materials',
    component: RawMaterialsStoreComponent
  },
  {
    path: 'pay/salary',
    component: SalaryComponent
  },
  {
    path: 'pay/labour',
    component: LabourComponent
  },
  {
    path: 'pay/material-collect',
    component: MaterialCollectComponent
  },
  {
    path: 'pay/other',
    component: OtherComponent
  },
  {
    path: 'pay/asset',
    component: AssetComponent
  },
  {
    path: 'pay/utility',
    component: UtilityComponent
  },
  {
    path: 'production/product',
    component: ProductComponent
  },
  {
    path: 'production/material-consumption',
    component: MaterialConsumptionComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    children:[
      {
        path:'in',
        component: AttendanceInComponent
      },
      {
        path:'out',
        component: AttendanceOutComponent
      }
    ]
  },

  {
    path: 'sell',
    component:SellComponent
  },
  {
    path: '**',
    redirectTo:'home',
    pathMatch:'full'
  }
];
