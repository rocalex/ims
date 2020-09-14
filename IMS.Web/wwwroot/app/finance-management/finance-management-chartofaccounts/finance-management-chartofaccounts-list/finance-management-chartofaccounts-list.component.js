"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const finance_management_chartofaccounts_service_1 = require("../finance-management-chartofaccounts.service");
const finance_management_chartofaccounts_model_1 = require("../finance-management-chartofaccounts.model");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
let ListFinanceManagementChartOfAccountsComponent = class ListFinanceManagementChartOfAccountsComponent {
    constructor(loaderService, permissionService, financeManagementChartOfAccountsService, snackbarService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.financeManagementChartOfAccountsService = financeManagementChartOfAccountsService;
        this.snackbarService = snackbarService;
        this.addedChartOfAccounts = new finance_management_chartofaccounts_model_1.ChartOfAccounts();
        this.chartOfAccountsList = [];
        this.parentChartOfAccountsList = [];
        this.chartOfAccountTypeEnumDetails = [
            { key: finance_management_chartofaccounts_model_1.ChartOfAccountTypeEnum.Assets, value: 'Assets' },
            { key: finance_management_chartofaccounts_model_1.ChartOfAccountTypeEnum.Liabilities, value: 'Liabilities' },
            { key: finance_management_chartofaccounts_model_1.ChartOfAccountTypeEnum.Income, value: 'Income' },
            { key: finance_management_chartofaccounts_model_1.ChartOfAccountTypeEnum.Expense, value: 'Expense' }
        ];
        this.isAddChartOfAccountFormVisible = false;
        this.isEditChartOfAccountFormVisible = false;
        this.treeViewData = [];
        // Validations
        this.isEmptyCodeError = false;
        this.isEmptyNameError = false;
        this.isEmptyAliasNameError = false;
        this.errorMessage = '';
    }
    ngOnInit() {
        this.isAddChartOfAccountFormVisible = false;
        this.isEditChartOfAccountFormVisible = false;
        this.addedChartOfAccounts = new finance_management_chartofaccounts_model_1.ChartOfAccounts();
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
        this.addedChartOfAccounts = new finance_management_chartofaccounts_model_1.ChartOfAccounts();
        this.getAutoSequenceNumberByTypeAndInstituteId();
        this.isAddChartOfAccountFormVisible = true;
        this.isEditChartOfAccountFormVisible = false;
    }
    hideChartOfAccountForm() {
        this.addedChartOfAccounts = new finance_management_chartofaccounts_model_1.ChartOfAccounts();
        this.isAddChartOfAccountFormVisible = false;
        this.isEditChartOfAccountFormVisible = false;
    }
    getChartOfAccountDetail(chartOfAccountId) {
        this.addedChartOfAccounts = new finance_management_chartofaccounts_model_1.ChartOfAccounts();
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
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceChartOfPayment, type);
    }
};
ListFinanceManagementChartOfAccountsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'finance-management-chartofaccounts-list.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService, permission_service_1.PermissionService,
        finance_management_chartofaccounts_service_1.FinanceManagementChartOfAccountsService,
        snackbar_service_1.SnackbarService])
], ListFinanceManagementChartOfAccountsComponent);
exports.ListFinanceManagementChartOfAccountsComponent = ListFinanceManagementChartOfAccountsComponent;
//# sourceMappingURL=finance-management-chartofaccounts-list.component.js.map