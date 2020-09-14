import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { FeeComponentManagementService } from '../student-management-fee-component.service';
import { FeeComponent, FeeComponentTypeEnum } from '../../student-fee-management.model';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-fee-component-add.html'
})
export class AddFeeComponentManagementComponent implements OnInit {

    feeComponent: FeeComponent = new FeeComponent();
    errorMessage: string = '';
    duplicatePriorityMessage: string = '';
    whiteSpaceError: string = '';
    feeComponentTypeEnumDetails: any[] = [
        { key: FeeComponentTypeEnum.ApplicableToAll, value: 'Applicable To All' },
        { key: FeeComponentTypeEnum.Deduction, value: 'Deduction' },
        { key: FeeComponentTypeEnum.Individual, value: 'Individual' },
        { key: FeeComponentTypeEnum.SpecialFee, value: 'Special Fee' }
    ];
    feeComponentPriorityList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    constructor(private loaderService: LoaderService,
        private snackbarService: SnackbarService,
        private feeComponentManagementService: FeeComponentManagementService,
        private router: Router) { }

    ngOnInit() {
        this.feeComponent.priority = 0;
    }

    checkWhiteSpace() {
        this.whiteSpaceError = '';
        if (this.feeComponent.name.trim() === '') {
            this.whiteSpaceError = 'Fee Component Name can\'t be null or empty';
        }
    }

    resetError() {
        this.whiteSpaceError = '';
        this.errorMessage = '';
        this.duplicatePriorityMessage = '';
    }

    addFeeComponent() {
        this.loaderService.toggleLoader(true);
        this.feeComponentManagementService.addFeeComponent(this.feeComponent)
            .then(res => {
                let response = res.json();
                if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                    if (response.message !== null && response.message !== undefined) {
                        this.errorMessage = response.message;
                    }
                    if (response.duplicatePriorityMessage !== null && response.duplicatePriorityMessage !== undefined) {
                        this.duplicatePriorityMessage = response.duplicatePriorityMessage;
                    }
                }
                else {
                    this.snackbarService.showSnackbar(response.message);
                    this.router.navigate(['student', 'feemanagement', 'component', 'list']);
                }

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }
}
