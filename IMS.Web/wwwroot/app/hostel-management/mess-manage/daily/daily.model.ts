export class SearchDailyExpenseRequest {
  messManageId: number;
  expenseTypeId: number;
}

export class DailyExpenseModel {
  id: number;
  messManageId: number;
  expenseTypeId: number;
  date: Date;
  billNo: string;
  particulars: string;
  amount: number;
  description: string;
  proofUrl: string;
}