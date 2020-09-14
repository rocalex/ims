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
const loader_service_1 = require("../../../../shared/loader-service");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
let ListCountryManagementComponent = class ListCountryManagementComponent {
    constructor(countryManagementService, loaderService, permissionService) {
        this.countryManagementService = countryManagementService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.countries = [];
    }
    ngOnInit() {
        this.loaderService.toggleLoader(true);
        this.getAllCountries();
    }
    getAllCountries() {
        this.countryManagementService.getAllCountries().then(res => {
            this.countries = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Administration, sidenav_model_1.UserGroupFeatureChildEnum.AcademicCountry, type);
    }
};
ListCountryManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'country-management-list.html'
    }),
    __metadata("design:paramtypes", [country_management_service_1.CountryManagementService, loader_service_1.LoaderService,
        permission_service_1.PermissionService])
], ListCountryManagementComponent);
exports.ListCountryManagementComponent = ListCountryManagementComponent;
//# sourceMappingURL=country-management-list.component.js.map