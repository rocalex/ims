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
const finance_management_payments_service_1 = require("../finance-management-payments.service");
const finance_management_payments_model_1 = require("../finance-management-payments.model");
let AddFinanceManagementPaymentsComponent = class AddFinanceManagementPaymentsComponent {
    constructor(loaderService, snackbarService, financeManagementPaymentsService, router) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.financeManagementPaymentsService = financeManagementPaymentsService;
        this.router = router;
        this.addedFinancePayment = new finance_management_payments_model_1.FinancePaymentAc();
        this.expenseChartOfAccountsList = [];
        this.paymentTypesList = [];
        this.systemUsersList = [];
        this.currentDate = new Date();
        this.paymentReferenceEnumDetails = [
            { key: finance_management_payments_model_1.FinancePaymentReferenceEnum.Accident, value: 'Accident' },
            { key: finance_management_payments_model_1.FinancePaymentReferenceEnum.Breakdown, value: 'Breakdown' },
            { key: finance_management_payments_model_1.FinancePaymentReferenceEnum.Maintenance, value: 'Maintenance' },
            { key: finance_management_payments_model_1.FinancePaymentReferenceEnum.PurchaseIndent, value: 'Purchase Indent' },
            { key: finance_management_payments_model_1.FinancePaymentReferenceEnum.Repair, value: 'Repair' }
        ];
        // Validations
        this.isEmptyCodeError = false;
        this.errorMessage = '';
    }
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
};
AddFinanceManagementPaymentsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'finance-management-payments-add.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        finance_management_payments_service_1.FinanceManagementPaymentsService,
        router_1.Router])
], AddFinanceManagementPaymentsComponent);
exports.AddFinanceManagementPaymentsComponent = AddFinanceManagementPaymentsComponent;
//# sourceMappingURL=finance-management-payments-add.component.js.map