const baseUrl = "http://localhost:8080";
export const storeEndPoints = {
  products:`${baseUrl}/api/v1/products`,
  materials: `${baseUrl}/api/v1/materials`,
  getAgedItems:`${baseUrl}/api/v1/products/aged`,
  assets: `${baseUrl}/api/v1/assets`,
  getProductions: `${baseUrl}/api/v1/productions`,
  customers: `${baseUrl}/api/v1/customers`,
  employees: `${baseUrl}/api/v1/employees`,
  addMaterialConsumption: `${baseUrl}/api/store/materials/consume`,
  addProductProduction:`${baseUrl}/api/store/products/produce`,
}

export const models={
  addProduct:`${baseUrl}/api/product-types/add`,
  addAsset: `${baseUrl}/api/asset-types/add`,
  addMaterial:`${baseUrl}/api/raw-material-types/add`,
  getProductTypes:`${baseUrl}/api/product-types/list`,
  getMaterialTypes: `${baseUrl}/api/raw-material-types/list`
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


  getMoneyInTaxed: `${baseUrl}/api/transactions/products-sold/money-in/taxed-in-dates`,
  getMoneyOutTaxed: `${baseUrl}/api/transactions/money-out/taxed-in-dates`,
  getAll: `${baseUrl}/api/transactions/all`,
  getAllBetweenDates: `${baseUrl}/api/transactions/all/in-dates`,
  getFuelConsumption: `${baseUrl}/api/transactions/fuel-consumption-records/list`,
  getFuelConsumptionBetweenDates: `${baseUrl}/api/transactions/fuel-consumption-records/list/in-dates`,
  getOthersBetweenDates: `${baseUrl}/api/transactions/other-expense-records/list/in-dates`,

  getMaterialsBetweenDates: `${baseUrl}/api/transactions/raw-material-in/list/in-dates`,
  getUtilitiesBetweenDates: `${baseUrl}/api/transactions/utility-expense-records/list/in-dates`,
  getLabourExpensesBetweenDates:`${baseUrl}/api/transactions/labour-expenses/list/in-dates`,
  getAssetExpensesBetweenDates:`${baseUrl}/api/transactions/asset-expenses/list/in-dates`,
  addSalaries:`${baseUrl}/api/salary/add`
}

export const attendances = {
  getAttendances:`${baseUrl}/api/v1/attendance/today`,
  addAttendanceIn : `${baseUrl}/api/v1/attendance/in`,
  addAttendanceOut : `${baseUrl}/api/v1/attendance/out`,
  resetAttendanceIn: `${baseUrl}/api/v1/attendance/reset`,



  getEmployeeAttendance: `${baseUrl}/api/attendance/list/employee/in-dates`,
  getAttendanceIns: `${baseUrl}/api/attendance/in/today`,
  getAttendanceHours: `${baseUrl}/api/attendance/hours`,
  removeAttendance: `${baseUrl}/api/attendance/out/today/remove`,


}
