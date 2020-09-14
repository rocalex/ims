import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { FinanceManagementPaymentTypesService } from '../finance-management-payment-types.service';

import { PaymentTypesAc } from '../finance-management-payment-types.model';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-management-payment-types-edit-details.html'
})
export class EditDetailsFinanceManagementPaymentTypesComponent implements OnInit {

    paymentTypeId: number;
    paymentType: PaymentTypesAc = new PaymentTypesAc();

    // Validations
    isEmptyCode: boolean = false;
    isEmptyName: boolean = false;
    errorMessage: string = '';

    constructor(private loaderService: LoaderService,
        private snackbarService: SnackbarService,
        private financeManagementPaymentTypesService: FinanceManagementPaymentTypesService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {

        this.activatedRoute.params.subscribe(param => this.paymentTypeId = param.id);
    }

    ngOnInit() {
        this.getPaymentTypeDetails();
    }

    getPaymentTypeDetails() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentTypesService.getPaymentTypeById(this.paymentTypeId)
            .then(res => {
                this.paymentType = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    checkWhiteSpace() {
        if (this.paymentType.code !== null && this.paymentType.code !== undefined && this.paymentType.code.trim() === '') {
            this.isEmptyCode = true;
        }
        if (this.paymentType.name !== null && this.paymentType.name !== undefined && this.paymentType.name.trim() === '') {
            this.isEmptyName = true;
        }
    }

    resetError() {
        if (this.paymentType.code !== null && this.paymentType.code !== undefined && this.paymentType.code.trim() !== '') {
            this.isEmptyCode = false;
        }
        if (this.paymentType.name !== null && this.paymentType.name !== undefined && this.paymentType.name.trim() !== '') {
            this.isEmptyName = false;
        }
    }

    updatePaymentType() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentTypesService.updatePaymentType(this.paymentType)
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
