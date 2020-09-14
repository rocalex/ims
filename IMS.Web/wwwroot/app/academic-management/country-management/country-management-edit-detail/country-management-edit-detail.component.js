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
const country_management_service_1 = require("../country-management.service");
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const academic_management_model_1 = require("../../academic-management.model");
let EditAndDetailCountryManagementComponent = class EditAndDetailCountryManagementComponent {
    constructor(countryManagementService, router, snackBar, loaderService) {
        this.countryManagementService = countryManagementService;
        this.router = router;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.baseModel = new academic_management_model_1.BaseModelLookUp();
        this.error = new academic_management_model_1.LookUpResponse();
        this.selectedUrl = '';
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.countryId = +(path[3]);
        this.selectedUrl = path[2];
        this.getCountryDetails();
    }
    getCountryDetails() {
        this.loaderService.toggleLoader(true);
        this.countryManagementService.getCountryDetails(this.countryId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['academic', 'country', 'list']);
            }
            else {
                this.baseModel.Code = response.code;
                this.baseModel.Name = response.name;
                this.baseModel.Description = response.description;
                this.baseModel.Status = response.status;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateInstituteCountry(updateCountry) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateCountry.lookUp.Name, Code: updateCountry.lookUp.Code, CountryId: this.countryId,
            Description: updateCountry.lookUp.Description, Status: updateCountry.lookUp.Status
        };
        this.countryManagementService.updaInstituteCountry(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['academic', 'country', 'list']);
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
EditAndDetailCountryManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'country-management-edit-detail.html'
    }),
    __metadata("design:paramtypes", [country_management_service_1.CountryManagementService, router_1.Router, snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService])
], EditAndDetailCountryManagementComponent);
exports.EditAndDetailCountryManagementComponent = EditAndDetailCountryManagementComponent;
//# sourceMappingURL=country-management-edit-detail.component.js.map