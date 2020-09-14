import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class ExpenditureService {
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

  getTotalSummary(id: number) {
      return this.http.get(this.dailyExpenseUrl + `/summary/${id}`);
  }
}