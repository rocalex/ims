import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { FinanceManagementChartOfAccountsService } from '../finance-management-chartofaccounts.service';

import { ChartOfAccounts, ChartOfAccountTypeEnum, ChartOfAccountsListViewAC, AddEditChartOfAccountsAC } from '../finance-management-chartofaccounts.model';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
    moduleId: module.id,
    templateUrl: 'finance-management-chartofaccounts-list.html'
})
export class ListFinanceManagementChartOfAccountsComponent implements OnInit {

    addedChartOfAccounts: ChartOfAccounts = new ChartOfAccounts();
    chartOfAccountsList: ChartOfAccountsListViewAC[] = [];
    parentChartOfAccountsList: ChartOfAccounts[] = [];
    chartOfAccountTypeEnumDetails: any[] = [
        { key: ChartOfAccountTypeEnum.Assets, value: 'Assets' },
        { key: ChartOfAccountTypeEnum.Liabilities, value: 'Liabilities' },
        { key: ChartOfAccountTypeEnum.Income, value: 'Income' },
        { key: ChartOfAccountTypeEnum.Expense, value: 'Expense' }
    ];
    seperator: string;
    isAddChartOfAccountFormVisible: boolean = false;
    isEditChartOfAccountFormVisible: boolean = false;

    treeViewData: any[] = [];

    // Validations
    isEmptyCodeError: boolean = false;
    isEmptyNameError: boolean = false;
    isEmptyAliasNameError: boolean = false;
    errorMessage: string = '';

  constructor(private loaderService: LoaderService, private permissionService: PermissionService,
        private financeManagementChartOfAccountsService: FinanceManagementChartOfAccountsService,
        private snackbarService: SnackbarService) { }

    ngOnInit() {
        this.isAddChartOfAccountFormVisible = false;
        this.isEditChartOfAccountFormVisible = false;
        this.addedChartOfAccounts = new ChartOfAccounts();
        this.getChartOfAccountsList();
    }

    getChartOfAccountsList() {
        this.treeViewData = [];
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.getChartOfAccountsList()
            .then(res => {
                this.chartOfAccountsList = res.json();

                // Set tree view data
                this.chartOfAccountsList.forEach(chartOfAccountType => {
                    // Set account types
                    let chartOfAccountTypeObj = {
                        id: chartOfAccountType.chartOfAccountTypeEnum + 1,
                        name: chartOfAccountType.chartOfAccountTypeEnumString,
                        isEditable: false,
                        children: []
                    };

                    // Set parent accounts
                    chartOfAccountType.parentChartOfAccounts.forEach(parentAccount => {
                        let parentAccountObj = {
                            id: parentAccount.id,
                            name: parentAccount.name,
                            isEditable: true,
                            children: []
                        };

                        // Set child accounts
                        parentAccount.childChartOfAccounts.forEach(childAccount => {
                            let childAccountObj = {
                                id: childAccount.id,
                                isEditable: true,
                                name: childAccount.name
                            };

                            parentAccountObj.children.push(childAccountObj);
                        });

                        chartOfAccountTypeObj.children.push(parentAccountObj);
                    });

                    this.treeViewData.push(chartOfAccountTypeObj);
                });

                this.loaderService.toggleLoader(false);
                this.getParentChartOfAccountsList();
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    getParentChartOfAccountsList() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.getParentChartOfAccountsList()
            .then(res => {
                this.parentChartOfAccountsList = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    getAutoSequenceNumberByTypeAndInstituteId() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.getAutoSequenceNumberByTypeAndInstituteId()
            .then(res => {
                var response = res.json();

                if (response.hasValue) {
                    this.addedChartOfAccounts.code = response.data;
                    this.seperator = response.seperator;
                    this.addedChartOfAccounts.isChartOfAccountCodeEditable = false;
                }
                else {
                    this.addedChartOfAccounts.isChartOfAccountCodeEditable = true;
                }
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    showAddChartOfAccountForm() {
        this.addedChartOfAccounts = new ChartOfAccounts();
        this.getAutoSequenceNumberByTypeAndInstituteId();
        this.isAddChartOfAccountFormVisible = true;
        this.isEditChartOfAccountFormVisible = false;
    }

    hideChartOfAccountForm() {
        this.addedChartOfAccounts = new ChartOfAccounts();
        this.isAddChartOfAccountFormVisible = false;
        this.isEditChartOfAccountFormVisible = false;
    }

    getChartOfAccountDetail(chartOfAccountId) {
        this.addedChartOfAccounts = new ChartOfAccounts();
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.getChartOfAccountById(chartOfAccountId)
            .then(res => {
                this.addedChartOfAccounts = res.json();
                this.isEditChartOfAccountFormVisible = true;
                this.isAddChartOfAccountFormVisible = false;
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

    updateChartOfAccount() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.updateChartOfAccount(this.addedChartOfAccounts)
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackbarService.showSnackbar(response.message);
                    this.ngOnInit();
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

    addChartOfAccount() {
        this.loaderService.toggleLoader(true);
        this.financeManagementChartOfAccountsService.addNewChartOfAccount(this.addedChartOfAccounts)
            .then(res => {
                let response = res.json();

                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackbarService.showSnackbar(response.message);
                    this.ngOnInit();
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

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceChartOfPayment, type);
  }
}