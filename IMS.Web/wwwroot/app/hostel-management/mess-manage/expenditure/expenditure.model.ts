import { ExpenseModel } from "../expense/expense.model";

export class SearchExpenditureModel {
  public Hostel: string;
  public Mess: string;
}

export class SearchExpenditureResultModel {
  expenseType: ExpenseModel;
  totalExpenditure: number;
  studentAmount: number;
}