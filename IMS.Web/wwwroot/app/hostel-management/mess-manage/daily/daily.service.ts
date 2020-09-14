import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { DailyExpenseModel, SearchDailyExpenseRequest } from './daily.model';

@Injectable()
export class DailyExpenseService {
  dailyExpenseUrl = 'api/dailyExpense';
  hostelUrl = 'api/hostel';
  messManageUrl = 'api/messManage';
  expenseTypeUrl = 'api/expenseType';

  constructor(private http: HttpService) {}

  getHostelList() {
    return this.http.get(this.hostelUrl);
  }

  getMessManageList(hostelId: number) {
      return this.http.get(this.messManageUrl + `/hostel/${hostelId}`);
  }

  getExpenseTypeList() {
    return this.http.get(this.expenseTypeUrl);
  }

  getDailyExpenseList(request: SearchDailyExpenseRequest) {
      return this.http.post(this.dailyExpenseUrl + `/list`, request);
  }

  saveDailyExpenses(dailyExpenses: DailyExpenseModel[]) {
      return this.http.post(this.dailyExpenseUrl, dailyExpenses);
  }

  uploadProfileProof(formData: FormData) {
      return this.http.postForFormData(this.dailyExpenseUrl + '/uploadproof', formData);
  }
}