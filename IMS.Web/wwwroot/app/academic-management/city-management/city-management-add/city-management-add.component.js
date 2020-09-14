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
let AddCityManagementComponent = class AddCityManagementComponent {
    constructor(cityManagementService, router, snackBar, loaderService) {
        this.cityManagementService = cityManagementService;
        this.router = router;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.countries = [];
        this.baseModel = new academic_management_model_1.BaseModelLookUp();
        this.error = new academic_management_model_1.LookUpResponse();
        this.selectedUrl = '';
    }
    ngOnInit() {
        this.selectedUrl = location.pathname.split('/')[2];
        this.getAllCountries();
    }
    getAllCountries() {
        this.loaderService.toggleLoader(true);
        this.cityManagementService.getAllCountries().then(res => {
            this.countries = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    addInstituteCity(addCity) {
        this.loaderService.toggleLoader(true);
        addCity.lookUp.StateId = addCity.state.id;
        this.cityManagementService.addInstituteCity(addCity.lookUp).then(res => {
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
AddCityManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'city-management-add.html'
    }),
    __metadata("design:paramtypes", [city_management_service_1.CityManagementService, router_1.Router, snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService])
], AddCityManagementComponent);
exports.AddCityManagementComponent = AddCityManagementComponent;
//# sourceMappingURL=city-management-add.component.js.map