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
const state_management_service_1 = require("../state-management.service");
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const academic_management_model_1 = require("../../academic-management.model");
let EditAndDetailStateManagementComponent = class EditAndDetailStateManagementComponent {
    constructor(stateManagementService, router, snackBar, loaderService) {
        this.stateManagementService = stateManagementService;
        this.router = router;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.countries = [];
        this.baseModel = new academic_management_model_1.BaseModelLookUp();
        this.error = new academic_management_model_1.LookUpResponse();
        this.selectedUrl = '';
        this.selectedCountry = {};
    }
    ngOnInit() {
        this.selectedUrl = location.pathname.split('/')[2];
        this.loaderService.toggleLoader(true);
        var path = location.pathname.split('/');
        this.stateId = +(path[3]);
        this.getStateDetails();
    }
    getStateDetails() {
        this.stateManagementService.getStateDetails(this.stateId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['academic', 'state', 'list']);
                this.loaderService.toggleLoader(false);
            }
            else {
                this.baseModel.Code = response.code;
                this.baseModel.Name = response.name;
                this.baseModel.Description = response.description;
                this.baseModel.Status = response.status;
                this.getAllCountries(response.country.id);
            }
        });
    }
    getAllCountries(countryId) {
        this.stateManagementService.getAllCountries().then(res => {
            this.countries = res.json();
            this.selectedCountry = this.countries.find(x => x.id === countryId);
            this.loaderService.toggleLoader(false);
        });
    }
    updaInstituteState(updateState) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateState.lookUp.Name, Code: updateState.lookUp.Code, CountryId: updateState.country.id,
            Description: updateState.lookUp.Description, Status: updateState.lookUp.Status, StateId: this.stateId
        };
        this.stateManagementService.updaInstituteState(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['academic', 'state', 'list']);
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
EditAndDetailStateManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'state-management-edit-detail.html'
    }),
    __metadata("design:paramtypes", [state_management_service_1.StateManagementService, router_1.Router, snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService])
], EditAndDetailStateManagementComponent);
exports.EditAndDetailStateManagementComponent = EditAndDetailStateManagementComponent;
//# sourceMappingURL=state-management-edit-detail.component.js.map