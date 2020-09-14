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
const city_management_service_1 = require("../city-management.service");
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const academic_management_model_1 = require("../../academic-management.model");
let EditAndDetailCityManagementComponent = class EditAndDetailCityManagementComponent {
    constructor(cityManagementService, router, snackBar, loaderService) {
        this.cityManagementService = cityManagementService;
        this.router = router;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.countries = [];
        this.selectedCountry = {};
        this.states = [];
        this.selectedState = {};
        this.baseModel = new academic_management_model_1.BaseModelLookUp();
        this.error = new academic_management_model_1.LookUpResponse();
        this.selectedUrl = '';
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.cityId = +(path[3]);
        this.selectedUrl = path[2];
        this.getCityDetails();
    }
    getCityDetails() {
        this.loaderService.toggleLoader(true);
        this.cityManagementService.getCityDetails(this.cityId).then(res => {
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
                this.getAllCountries(response.state.countryId, response.stateId);
            }
        });
    }
    getAllCountries(countryId, stateId) {
        this.cityManagementService.getAllCountries().then(res => {
            this.countries = res.json();
            this.selectedCountry = this.countries.find(x => x.id === countryId);
            var country = this.countries.find(x => x.id === this.selectedCountry.id);
            this.states = country.states;
            this.selectedState = this.states.find(x => x.id === stateId);
            this.loaderService.toggleLoader(false);
        });
    }
    getStates() {
        var country = this.countries.find(x => x.id === this.selectedCountry.id);
        this.states = country.states;
        this.selectedState = {};
    }
    updateInstituteCity(updateCity) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateCity.lookUp.Name, Code: updateCity.lookUp.Code, StateId: updateCity.state.id,
            Description: updateCity.lookUp.Description, Status: updateCity.lookUp.Status, CityId: this.cityId
        };
        this.cityManagementService.updaInstituteCity(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['academic', 'city', 'list']);
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
EditAndDetailCityManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'city-management-edit-detail.html'
    }),
    __metadata("design:paramtypes", [city_management_service_1.CityManagementService, router_1.Router, snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService])
], EditAndDetailCityManagementComponent);
exports.EditAndDetailCityManagementComponent = EditAndDetailCityManagementComponent;
//# sourceMappingURL=city-management-edit-detail.component.js.map