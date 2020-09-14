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
const currency_management_service_1 = require("../currency-management.service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const loader_service_1 = require("../../../../shared/loader-service");
const academic_management_model_1 = require("../../academic-management.model");
let EditAndDetailCurrencyManagementComponent = class EditAndDetailCurrencyManagementComponent {
    constructor(currencyManagementService, router, snackBar, loaderService) {
        this.currencyManagementService = currencyManagementService;
        this.router = router;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.baseModel = new academic_management_model_1.BaseModelLookUp();
        this.error = new academic_management_model_1.LookUpResponse();
        this.selectedUrl = '';
    }
    ngOnInit() {
        this.loaderService.toggleLoader(true);
        var path = location.pathname.split('/');
        this.currencyId = +(path[3]);
        this.selectedUrl = path[2];
        this.getCurrencyDetails();
    }
    getCurrencyDetails() {
        this.currencyManagementService.getCurrencyDetails(this.currencyId).then(res => {
            var response = res.json();
            if (response.message) {
                this.router.navigate(['academic', 'currency', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.baseModel.Code = response.symbol;
                this.baseModel.Name = response.currencyName;
                this.baseModel.Description = response.description;
                this.baseModel.Status = response.status;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updaInstituteCurrency(updateCurrency) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateCurrency.lookUp.Name, Code: updateCurrency.lookUp.Code, CurrencyId: this.currencyId,
            Description: updateCurrency.lookUp.Description, Status: updateCurrency.lookUp.Status
        };
        this.currencyManagementService.updaInstituteCurrency(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['academic', 'currency', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.error = new academic_management_model_1.LookUpResponse();
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
};
EditAndDetailCurrencyManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'currency-management-edit-detail.html'
    }),
    __metadata("design:paramtypes", [currency_management_service_1.CurrencyManagementService, router_1.Router, snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService])
], EditAndDetailCurrencyManagementComponent);
exports.EditAndDetailCurrencyManagementComponent = EditAndDetailCurrencyManagementComponent;
//# sourceMappingURL=currency-management-edit-detail.component.js.map