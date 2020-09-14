import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { FinanceManagementPaymentsService } from '../finance-management-payments.service';

import { FinancePaymentAc, FinancePaymentReferenceEnum } from '../finance-management-payments.model';
import { FinanceReceipts } from '../../finance-management-receipt/finance-management-receipt.model';
import { PaymentTypesAc } from '../../finance-management-payment-types/finance-management-payment-types.model';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-management-payments-add.html'
})
export class AddFinanceManagementPaymentsComponent implements OnInit {

    addedFinancePayment: FinancePaymentAc = new FinancePaymentAc();
    expenseChartOfAccountsList: FinanceReceipts[] = [];
    paymentTypesList: PaymentTypesAc[] = [];
    systemUsersList: any[] = [];
    loggedInUserId: string;
    currentDate: Date = new Date();
    paymentReferenceEnumDetails: any[] = [
        { key: FinancePaymentReferenceEnum.Accident, value: 'Accident' },
        { key: FinancePaymentReferenceEnum.Breakdown, value: 'Breakdown' },
        { key: FinancePaymentReferenceEnum.Maintenance, value: 'Maintenance' },
        { key: FinancePaymentReferenceEnum.PurchaseIndent, value: 'Purchase Indent' },
        { key: FinancePaymentReferenceEnum.Repair, value: 'Repair' }
    ];

    // Validations
    isEmptyCodeError: boolean = false;
    errorMessage: string = '';

    constructor(private loaderService: LoaderService,
        private snackbarService: SnackbarService,
        private financeManagementPaymentsService: FinanceManagementPaymentsService,
        private router: Router) { }

    ngOnInit() {
        this.getInitialData();
    }

    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentsService.getFinancePaymentInitialData()
            .then(res => {
                let response = res.json();
                this.expenseChartOfAccountsList = response.expenseChartOfAccountsList;
                this.systemUsersList = response.systemUsersList;
                this.paymentTypesList = response.paymentTypesList;
                this.loggedInUserId = response.loggedInUserId;
                this.addedFinancePayment.paymentById = this.loggedInUserId;

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    checkWhiteSpace() {
        if (this.addedFinancePayment.code !== null && this.addedFinancePayment.code !== undefined && this.addedFinancePayment.code.trim() === '') {
            this.isEmptyCodeError = true;
        }
    }

    resetError() {
        if (this.addedFinancePayment.code !== null && this.addedFinancePayment.code !== undefined && this.addedFinancePayment.code.trim() !== '') {
            this.isEmptyCodeError = false;
        }
    }

    addFinancePayment() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentsService.addNewFinancePayment(this.addedFinancePayment)
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackbarService.showSnackbar(response.message);
                    this.router.navigate(['finance', 'payment', 'list']);
                }
                else {
                    this.errorMessage = response.message;
                }

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }
}
