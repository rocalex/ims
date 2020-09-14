import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { FinanceManagementChartOfAccountsService } from '../finance-management-chartofaccounts.service';

import { ChartOfAccounts, ChartOfAccountTypeEnum } from '../finance-management-chartofaccounts.model';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-management-chartofaccounts-edit-details.html'
})
export class EditDetailsFinanceManagementChartOfAccountsComponent implements OnInit {

    chartOfAccountId: number;
    chartOfAccount: ChartOfAccounts = new ChartOfAccounts();
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
        private router: Router,
        private activatedRoute: ActivatedRoute) {

        this.activatedRoute.params.subscribe(param => this.chartOfAccountId = param.id);
    }

    ngOnInit() {
        this.getChartOfAccountDetails();        
    }

    getChartOfAccountDetails() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.getChartOfAccountById(this.chartOfAccountId)
            .then(res => {
                this.chartOfAccount = res.json();
                
                this.loaderService.toggleLoader(false);

                this.getParentChartOfAccountsList();
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    getParentChartOfAccountsList() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.getChartOfAccountsList()
            .then(res => {
                this.parentChartOfAccountsList = res.json().filter(x => x.isParent && x.id !== this.chartOfAccount.id);
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    updateChartOfAccount() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.updateChartOfAccount(this.chartOfAccount)
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
        if (this.chartOfAccount.code !== null && this.chartOfAccount.code !== undefined && this.chartOfAccount.code.trim() === '') {
            this.isEmptyCodeError = true;
        }
        if (this.chartOfAccount.name !== null && this.chartOfAccount.name !== undefined && this.chartOfAccount.name.trim() === '') {
            this.isEmptyNameError = true;
        }
        if (this.chartOfAccount.aliasName !== null && this.chartOfAccount.aliasName !== undefined && this.chartOfAccount.aliasName.trim() === '') {
            this.isEmptyAliasNameError = true;
        }
    }

    resetError() {
        if (this.chartOfAccount.code !== null && this.chartOfAccount.code !== undefined && this.chartOfAccount.code.trim() !== '') {
            this.isEmptyCodeError = false;
        }
        if (this.chartOfAccount.name !== null && this.chartOfAccount.name !== undefined && this.chartOfAccount.name.trim() !== '') {
            this.isEmptyNameError = false;
        }
        if (this.chartOfAccount.aliasName !== null && this.chartOfAccount.aliasName !== undefined && this.chartOfAccount.aliasName.trim() !== '') {
            this.isEmptyAliasNameError = false;
        }
    }

    setParentAccountType() {
        this.chartOfAccount.accountType = this.parentChartOfAccountsList.filter(x => x.id == this.chartOfAccount.parentGroupId)[0].accountType;
    }
}
