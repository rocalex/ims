import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';
import { ExpenseModel } from './expense.model';

@Injectable()
export class ExpenseService {
  expenseTypeManagementUrl = 'api/expenseType';

  constructor(private http: HttpService) {}

  getexpenseTypesForLoggedInUser() {
    return this.http.get(this.expenseTypeManagementUrl);
  }

  getexpenseTypeById(id: number) {
    return this.http.get(this.expenseTypeManagementUrl + `/${id}`);
  }

  addexpenseType(expenseType: ExpenseModel) {
    return this.http.post(this.expenseTypeManagementUrl, expenseType);
  }

  updateexpenseType(expenseType: ExpenseModel) {
    return this.http.put(this.expenseTypeManagementUrl, expenseType);
  }

  deleteexpenseType(expenseTypeId: number) {
    return this.http.delete(this.expenseTypeManagementUrl + '/' + expenseTypeId);
  }
}