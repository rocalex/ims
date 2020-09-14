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
const finance_management_payment_types_service_1 = require("../finance-management-payment-types.service");
const finance_management_payment_types_model_1 = require("../finance-management-payment-types.model");
let AddFinanceManagementPaymentTypesComponent = class AddFinanceManagementPaymentTypesComponent {
    constructor(loaderService, snackbarService, financeManagementPaymentTypesService, router) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.financeManagementPaymentTypesService = financeManagementPaymentTypesService;
        this.router = router;
        this.addedPaymentType = new finance_management_payment_types_model_1.PaymentTypesAc();
        // Validations
        this.isEmptyCode = false;
        this.isEmptyName = false;
        this.errorMessage = '';
    }
    ngOnInit() { }
    checkWhiteSpace() {
        if (this.addedPaymentType.code !== null && this.addedPaymentType.code !== undefined && this.addedPaymentType.code.trim() === '') {
            this.isEmptyCode = true;
        }
        if (this.addedPaymentType.name !== null && this.addedPaymentType.name !== undefined && this.addedPaymentType.name.trim() === '') {
            this.isEmptyName = true;
        }
    }
    resetError() {
        if (this.addedPaymentType.code !== null && this.addedPaymentType.code !== undefined && this.addedPaymentType.code.trim() !== '') {
            this.isEmptyCode = false;
        }
        if (this.addedPaymentType.name !== null && this.addedPaymentType.name !== undefined && this.addedPaymentType.name.trim() !== '') {
            this.isEmptyName = false;
        }
    }
    addPaymentType() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentTypesService.addNewPaymentType(this.addedPaymentType)
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
};
AddFinanceManagementPaymentTypesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'finance-management-payment-types-add.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        finance_management_payment_types_service_1.FinanceManagementPaymentTypesService,
        router_1.Router])
], AddFinanceManagementPaymentTypesComponent);
exports.AddFinanceManagementPaymentTypesComponent = AddFinanceManagementPaymentTypesComponent;
//# sourceMappingURL=finance-management-payment-types-add.component.js.map