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
let EditDetailsFinanceManagementChartOfAccountsComponent = class EditDetailsFinanceManagementChartOfAccountsComponent {
    constructor(loaderService, snackbarService, financeManagementChartOfAccountsService, router, activatedRoute) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.financeManagementChartOfAccountsService = financeManagementChartOfAccountsService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.chartOfAccount = new finance_management_chartofaccounts_model_1.ChartOfAccounts();
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
};
EditDetailsFinanceManagementChartOfAccountsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'finance-management-chartofaccounts-edit-details.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        finance_management_chartofaccounts_service_1.FinanceManagementChartOfAccountsService,
        router_1.Router,
        router_1.ActivatedRoute])
], EditDetailsFinanceManagementChartOfAccountsComponent);
exports.EditDetailsFinanceManagementChartOfAccountsComponent = EditDetailsFinanceManagementChartOfAccountsComponent;
//# sourceMappingURL=finance-management-chartofaccounts-edit-details.component.js.map