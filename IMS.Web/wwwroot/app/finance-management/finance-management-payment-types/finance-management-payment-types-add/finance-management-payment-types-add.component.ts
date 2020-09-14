import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { FinanceManagementPaymentTypesService } from '../finance-management-payment-types.service';

import { PaymentTypesAc } from '../finance-management-payment-types.model';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-management-payment-types-add.html'
})
export class AddFinanceManagementPaymentTypesComponent implements OnInit {

    addedPaymentType: PaymentTypesAc = new PaymentTypesAc();

    // Validations
    isEmptyCode: boolean = false;
    isEmptyName: boolean = false;
    errorMessage: string = '';

    constructor(private loaderService: LoaderService,
        private snackbarService: SnackbarService,
        private financeManagementPaymentTypesService: FinanceManagementPaymentTypesService,
        private router: Router) { }

    ngOnInit() { }

    checkWhiteSpace() {
        if (this.addedPaymentType.code !== null && this.addedPaymentType.code !== undefined && this.addedPaymentType.code.trim() === '') {
            this.isEmptyCode = true;
        }
        if (this.addedPaymentType.name !== null && this.addedPaymentType.name !== undefined && this.addedPaymentType.name.trim() === '') {
            this.isEmptyName = true;
        }
    }

    resetError() {
        if (this.addedPaymentType.code !== null && this.addedPaymentType.code !== undefined && this.addedPaymentType.code.trim() !== '') {
            this.isEmptyCode = false;
        }
        if (this.addedPaymentType.name !== null && this.addedPaymentType.name !== undefined && this.addedPaymentType.name.trim() !== '') {
            this.isEmptyName = false;
        }
    }

    addPaymentType() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentTypesService.addNewPaymentType(this.addedPaymentType)
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackbarService.showSnackbar(response.message);
                    this.router.navigate(['finance', 'paymenttypes', 'list']);
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
