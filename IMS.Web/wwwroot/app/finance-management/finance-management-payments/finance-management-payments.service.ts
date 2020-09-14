import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

import { FinancePaymentAc } from './finance-management-payments.model';

@Injectable()
export class FinanceManagementPaymentsService {

    FinanceManagementPaymentsUrl = 'api/financemanagement/payment';

    constructor(private http: HttpService) { }

    getFinancePaymentInitialData() {
        return this.http.get(this.FinanceManagementPaymentsUrl + '/initial');
    }

    getAllFinancePayments() {
        return this.http.get(this.FinanceManagementPaymentsUrl);
    }

    getFinancePaymentById(financePaymentId: number) {
        return this.http.get(this.FinanceManagementPaymentsUrl + '/' + financePaymentId);
    }

    addNewFinancePayment(addedFinancePayment: FinancePaymentAc) {
        return this.http.post(this.FinanceManagementPaymentsUrl, addedFinancePayment);
    }

    updateFinancePayment(updatedFinancePayment: FinancePaymentAc) {
        return this.http.put(this.FinanceManagementPaymentsUrl, updatedFinancePayment);
    }
}
