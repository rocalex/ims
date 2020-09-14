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
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const finance_management_chartofaccounts_service_1 = require("../finance-management-chartofaccounts.service");
const finance_management_chartofaccounts_model_1 = require("../finance-management-chartofaccounts.model");
let AddFinanceManagementChartOfAccountsComponent = class AddFinanceManagementChartOfAccountsComponent {
    constructor(loaderService, snackbarService, financeManagementChartOfAccountsService, router) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.financeManagementChartOfAccountsService = financeManagementChartOfAccountsService;
        this.router = router;
        this.addedChartOfAccounts = new finance_management_chartofaccounts_model_1.ChartOfAccounts();
        this.isChartOfAccountCodeEditable = false;
        this.parentChartOfAccountsList = [];
        this.chartOfAccountTypeEnumDetails = [
            { key: finance_management_chartofaccounts_model_1.ChartOfAccountTypeEnum.Assets, value: 'Assets' },
            { key: finance_management_chartofaccounts_model_1.ChartOfAccountTypeEnum.Liabilities, value: 'Liabilities' },
            { key: finance_management_chartofaccounts_model_1.ChartOfAccountTypeEnum.Income, value: 'Income' },
            { key: finance_management_chartofaccounts_model_1.ChartOfAccountTypeEnum.Expense, value: 'Expense' }
        ];
        // Validations
        this.isEmptyCodeError = false;
        this.isEmptyNameError = false;
        this.isEmptyAliasNameError = false;
        this.errorMessage = '';
    }
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
};
AddFinanceManagementChartOfAccountsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'finance-management-chartofaccounts-add.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        finance_management_chartofaccounts_service_1.FinanceManagementChartOfAccountsService,
        router_1.Router])
], AddFinanceManagementChartOfAccountsComponent);
exports.AddFinanceManagementChartOfAccountsComponent = AddFinanceManagementChartOfAccountsComponent;
//# sourceMappingURL=finance-management-chartofaccounts-add.component.js.map