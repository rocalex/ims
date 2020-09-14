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
let EditDetailsFinanceManagementPaymentTypesComponent = class EditDetailsFinanceManagementPaymentTypesComponent {
    constructor(loaderService, snackbarService, financeManagementPaymentTypesService, router, activatedRoute) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.financeManagementPaymentTypesService = financeManagementPaymentTypesService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.paymentType = new finance_management_payment_types_model_1.PaymentTypesAc();
        // Validations
        this.isEmptyCode = false;
        this.isEmptyName = false;
        this.errorMessage = '';
        this.activatedRoute.params.subscribe(param => this.paymentTypeId = param.id);
    }
    ngOnInit() {
        this.getPaymentTypeDetails();
    }
    getPaymentTypeDetails() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentTypesService.getPaymentTypeById(this.paymentTypeId)
            .then(res => {
            this.paymentType = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    checkWhiteSpace() {
        if (this.paymentType.code !== null && this.paymentType.code !== undefined && this.paymentType.code.trim() === '') {
            this.isEmptyCode = true;
        }
        if (this.paymentType.name !== null && this.paymentType.name !== undefined && this.paymentType.name.trim() === '') {
            this.isEmptyName = true;
        }
    }
    resetError() {
        if (this.paymentType.code !== null && this.paymentType.code !== undefined && this.paymentType.code.trim() !== '') {
            this.isEmptyCode = false;
        }
        if (this.paymentType.name !== null && this.paymentType.name !== undefined && this.paymentType.name.trim() !== '') {
            this.isEmptyName = false;
        }
    }
    updatePaymentType() {
        this.loaderService.toggleLoader(true);
        this.financeManagementPaymentTypesService.updatePaymentType(this.paymentType)
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
EditDetailsFinanceManagementPaymentTypesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'finance-management-payment-types-edit-details.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        finance_management_payment_types_service_1.FinanceManagementPaymentTypesService,
        router_1.Router,
        router_1.ActivatedRoute])
], EditDetailsFinanceManagementPaymentTypesComponent);
exports.EditDetailsFinanceManagementPaymentTypesComponent = EditDetailsFinanceManagementPaymentTypesComponent;
//# sourceMappingURL=finance-management-payment-types-edit-details.component.js.map