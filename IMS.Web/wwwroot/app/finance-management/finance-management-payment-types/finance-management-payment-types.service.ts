import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

import { PaymentTypesAc } from './finance-management-payment-types.model';

@Injectable()
export class FinanceManagementPaymentTypesService {

    FinanceManagementPaymentTypesUrl = 'api/financemanagement/paymenttypes';

    constructor(private http: HttpService) { }

    getAllPaymentTypes() {
        return this.http.get(this.FinanceManagementPaymentTypesUrl);
    }

    getPaymentTypeById(paymentTypeId: number) {
        return this.http.get(this.FinanceManagementPaymentTypesUrl + '/' + paymentTypeId);
    }

    addNewPaymentType(addedPaymentType: PaymentTypesAc) {
        return this.http.post(this.FinanceManagementPaymentTypesUrl, addedPaymentType);
    }

    updatePaymentType(updatedPaymentType: PaymentTypesAc) {
        return this.http.put(this.FinanceManagementPaymentTypesUrl, updatedPaymentType);
    }
}
