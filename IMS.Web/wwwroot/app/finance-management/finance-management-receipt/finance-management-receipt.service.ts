import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

import { FinanceReceipts } from './finance-management-receipt.model';

@Injectable()
export class FinanceManagementReceiptService {

    FinanceManagementReceiptUrl = 'api/financemanagement/receipt';

    constructor(private http: HttpService) { }

    getFinanceReceiptsList() {
        return this.http.get(this.FinanceManagementReceiptUrl);
    }

    getFinanceReceiptById(financeReceiptId: number) {
        return this.http.get(this.FinanceManagementReceiptUrl + '/' + financeReceiptId);
    }

    addNewFinanceReceipt(addedFinanceReceipt: FinanceReceipts) {
        return this.http.post(this.FinanceManagementReceiptUrl, addedFinanceReceipt);
    }

    updateFinanceReceipt(updatedFinanceReceipt: FinanceReceipts) {
        return this.http.put(this.FinanceManagementReceiptUrl, updatedFinanceReceipt);
    }

    getFinanceReceiptCreationInitialData() {
        return this.http.get(this.FinanceManagementReceiptUrl + '/initial');
    }
}
