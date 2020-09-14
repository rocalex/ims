import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { FinanceManagementChartOfAccountsService } from '../finance-management-chartofaccounts.service';

import { ChartOfAccounts, ChartOfAccountTypeEnum } from '../finance-management-chartofaccounts.model';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-management-chartofaccounts-add.html'
})
export class AddFinanceManagementChartOfAccountsComponent implements OnInit {

    addedChartOfAccounts: ChartOfAccounts = new ChartOfAccounts();
    isChartOfAccountCodeEditable: boolean = false;
    parentChartOfAccountsList: ChartOfAccounts[] = [];
    chartOfAccountTypeEnumDetails: any[] = [
        { key: ChartOfAccountTypeEnum.Assets, value: 'Assets' },
        { key: ChartOfAccountTypeEnum.Liabilities, value: 'Liabilities' },
        { key: ChartOfAccountTypeEnum.Income, value: 'Income' },
        { key: ChartOfAccountTypeEnum.Expense, value: 'Expense' }
    ];

    // Validations
    isEmptyCodeError: boolean = false;
    isEmptyNameError: boolean = false;
    isEmptyAliasNameError: boolean = false;
    errorMessage: string = '';

    constructor(private loaderService: LoaderService,
        private snackbarService: SnackbarService,
        private financeManagementChartOfAccountsService: FinanceManagementChartOfAccountsService,
        private router: Router) { }

    ngOnInit() {
        this.getAutoSequenceNumberByTypeAndInstituteId();
        this.getParentChartOfAccountsList();
    }

    getAutoSequenceNumberByTypeAndInstituteId() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.getAutoSequenceNumberByTypeAndInstituteId()
            .then(res => {
                var response = res.json();

                if (response.hasValue) {
                    this.addedChartOfAccounts.code = response.data;
                    this.isChartOfAccountCodeEditable = false;
                }
                else {
                    this.isChartOfAccountCodeEditable = true;
                }
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    getParentChartOfAccountsList() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.getChartOfAccountsList()
            .then(res => {
                this.parentChartOfAccountsList = res.json().filter(x => x.isParent);
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    addChartOfAccount() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.addNewChartOfAccount(this.addedChartOfAccounts)
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackbarService.showSnackbar(response.message);
                    this.router.navigate(['finance', 'chartofaccounts', 'list']);
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

    checkWhiteSpace() {
        if (this.addedChartOfAccounts.code !== null && this.addedChartOfAccounts.code !== undefined && this.addedChartOfAccounts.code.trim() === '') {
            this.isEmptyCodeError = true;
        }
        if (this.addedChartOfAccounts.name !== null && this.addedChartOfAccounts.name !== undefined && this.addedChartOfAccounts.name.trim() === '') {
            this.isEmptyNameError = true;
        }
        if (this.addedChartOfAccounts.aliasName !== null && this.addedChartOfAccounts.aliasName !== undefined && this.addedChartOfAccounts.aliasName.trim() === '') {
            this.isEmptyAliasNameError = true;
        }
    }

    resetError() {
        if (this.addedChartOfAccounts.code !== null && this.addedChartOfAccounts.code !== undefined && this.addedChartOfAccounts.code.trim() !== '') {
            this.isEmptyCodeError = false;
        }
        if (this.addedChartOfAccounts.name !== null && this.addedChartOfAccounts.name !== undefined && this.addedChartOfAccounts.name.trim() !== '') {
            this.isEmptyNameError = false;
        }
        if (this.addedChartOfAccounts.aliasName !== null && this.addedChartOfAccounts.aliasName !== undefined && this.addedChartOfAccounts.aliasName.trim() !== '') {
            this.isEmptyAliasNameError = false;
        }
    }

    setParentAccountType() {
        this.addedChartOfAccounts.accountType = this.parentChartOfAccountsList.filter(x => x.id == this.addedChartOfAccounts.parentGroupId)[0].accountType;
    }
}
