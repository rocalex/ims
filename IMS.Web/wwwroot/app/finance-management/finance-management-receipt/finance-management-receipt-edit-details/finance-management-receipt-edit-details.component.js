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
const finance_management_receipt_service_1 = require("../finance-management-receipt.service");
const finance_management_receipt_model_1 = require("../finance-management-receipt.model");
let EditDetailsFinanceManagementReceiptComponent = class EditDetailsFinanceManagementReceiptComponent {
    constructor(loaderService, snackbarService, financeManagementReceiptService, router, activatedRoute) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.financeManagementReceiptService = financeManagementReceiptService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.financeReceipt = new finance_management_receipt_model_1.FinanceReceipts();
        this.incomeChartOfAccountsList = [];
        this.systemUsersList = [];
        this.currentDate = new Date();
        // Validations
        this.isEmptyCodeError = false;
        this.errorMessage = '';
        this.activatedRoute.params.subscribe(param => this.financeReceiptId = param.id);
    }
    ngOnInit() {
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.financeManagementReceiptService.getFinanceReceiptCreationInitialData()
            .then(res => {
            let response = res.json();
            this.incomeChartOfAccountsList = response.incomeChartOfAccountsList;
            this.systemUsersList = response.systemUsersList;
            this.loggedInUserId = response.loggedInUserId;
            this.financeReceipt.receivedBy = this.loggedInUserId;
            this.loaderService.toggleLoader(false);
            this.getFinanceReceiptData();
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    getFinanceReceiptData() {
        this.loaderService.toggleLoader(true);
        this.financeManagementReceiptService.getFinanceReceiptById(this.financeReceiptId)
            .then(res => {
            this.financeReceipt = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    checkWhiteSpace() {
        if (this.financeReceipt.code !== null && this.financeReceipt.code !== undefined && this.financeReceipt.code.trim() === '') {
            this.isEmptyCodeError = true;
        }
    }
    resetError() {
        if (this.financeReceipt.code !== null && this.financeReceipt.code !== undefined && this.financeReceipt.code.trim() !== '') {
            this.isEmptyCodeError = false;
        }
    }
    updateFinanceReceipt() {
        this.loaderService.toggleLoader(true);
        this.financeReceipt.receiptDate = this.convertDateToUtc(this.financeReceipt.receiptDate);
        this.financeManagementReceiptService.updateFinanceReceipt(this.financeReceipt)
            .then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackbarService.showSnackbar(response.message);
                this.router.navigate(['finance', 'receipt', 'list']);
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
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
};
EditDetailsFinanceManagementReceiptComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'finance-management-receipt-edit-details.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        finance_management_receipt_service_1.FinanceManagementReceiptService,
        router_1.Router,
        router_1.ActivatedRoute])
], EditDetailsFinanceManagementReceiptComponent);
exports.EditDetailsFinanceManagementReceiptComponent = EditDetailsFinanceManagementReceiptComponent;
//# sourceMappingURL=finance-management-receipt-edit-details.component.js.map