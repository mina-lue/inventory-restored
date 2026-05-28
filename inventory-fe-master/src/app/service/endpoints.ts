import { environment } from '../../environments/environment';

const baseUrl = environment.apiBaseUrl;
export const storeEndPoints = {
  products:`${baseUrl}/api/v1/products`,
  lowStockProducts:`${baseUrl}/api/v1/products/low-stock`,
  productReorderSuggestions:`${baseUrl}/api/v1/products/reorder-suggestions`,
  materials: `${baseUrl}/api/v1/materials`,
  lowStockMaterials: `${baseUrl}/api/v1/materials/low-stock`,
  materialReorderSuggestions: `${baseUrl}/api/v1/materials/reorder-suggestions`,
  getAgedItems:`${baseUrl}/api/v1/products/aged`,
  assets: `${baseUrl}/api/v1/assets`,
  getProductions: `${baseUrl}/api/v1/productions`,
  customers: `${baseUrl}/api/v1/customers`,
  employees: `${baseUrl}/api/v1/employees`,
  addMaterialConsumption: `${baseUrl}/api/v1/consumption`,
  addProductProduction:`${baseUrl}/api/v1/productions`,
}

export const models={
  addProduct:`${baseUrl}/api/v1/products`,
  addAsset: `${baseUrl}/api/v1/assets`,
  addMaterial:`${baseUrl}/api/v1/materials`,
  getProductTypes:`${baseUrl}/api/v1/products`,
  getMaterialTypes: `${baseUrl}/api/v1/materials`
}

export const transactions = {
  getBalance: `${baseUrl}/api/v1/balance`,
  getMoneyIn: `${baseUrl}/api/v1/transactions/money-in`,
  getRecentSales: `${baseUrl}/api/v1/transactions/recent-sales`,
  getProductSellsBetweenDates: `${baseUrl}/api/v1/transactions/sales`,
  getMoneyOut: `${baseUrl}/api/v1/transactions/money-out`,
  getProducts: `${baseUrl}/api/v1/transactions/sales`,
  materials: `${baseUrl}/api/v1/transactions/materials`,
  utilities: `${baseUrl}/api/v1/expenses/utility`,
  others: `${baseUrl}/api/v1/expenses/others`,
  assetExpenses:`${baseUrl}/api/v1/expenses/assets`,
  labourExpenses:`${baseUrl}/api/v1/expenses/labours`,
  addProductSold: `${baseUrl}/api/v1/transactions/sales`,


  getMoneyInTaxed: `${baseUrl}/api/v1/transactions/money-in`,
  getMoneyOutTaxed: `${baseUrl}/api/v1/transactions/money-out`,
  getAll: `${baseUrl}/api/v1/stock-movements`,
  getAllBetweenDates: `${baseUrl}/api/v1/stock-movements`,
  getFuelConsumption: `${baseUrl}/api/v1/stock-movements`,
  getFuelConsumptionBetweenDates: `${baseUrl}/api/v1/stock-movements`,
  getOthersBetweenDates: `${baseUrl}/api/v1/expenses/others`,

  getMaterialsBetweenDates: `${baseUrl}/api/v1/transactions/materials`,
  getUtilitiesBetweenDates: `${baseUrl}/api/v1/expenses/utility`,
  getLabourExpensesBetweenDates:`${baseUrl}/api/v1/expenses/labours`,
  getAssetExpensesBetweenDates:`${baseUrl}/api/v1/expenses/assets`,
  addSalaries:`${baseUrl}/api/v1/salary/pay-all`
}

export const attendances = {
  getAttendances:`${baseUrl}/api/v1/attendance/today`,
  addAttendanceIn : `${baseUrl}/api/v1/attendance/in`,
  addAttendanceOut : `${baseUrl}/api/v1/attendance/out`,
  resetAttendanceIn: `${baseUrl}/api/v1/attendance/reset`,



  getEmployeeAttendance: `${baseUrl}/api/v1/attendance`,
  getAttendanceIns: `${baseUrl}/api/v1/attendance/today`,
  getAttendanceHours: `${baseUrl}/api/v1/salary/calculate`,
  removeAttendance: `${baseUrl}/api/v1/attendance/reset`,


}
