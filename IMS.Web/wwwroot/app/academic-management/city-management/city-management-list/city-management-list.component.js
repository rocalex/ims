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
const loader_service_1 = require("../../../../shared/loader-service");
const material_1 = require("@angular/material");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
let ListCityManagementComponent = class ListCityManagementComponent {
    constructor(cityManagementService, loaderService, permissionService) {
        this.cityManagementService = cityManagementService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.cities = [];
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = new material_1.MatTableDataSource(ELEMENT_DATA);
    }
    ngOnInit() {
        this.loaderService.toggleLoader(true);
        this.getAllCities();
        this.dataSource.paginator = this.paginator;
    }
    getAllCities() {
        this.cityManagementService.getAllCities().then(res => {
            this.cities = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Administration, sidenav_model_1.UserGroupFeatureChildEnum.AcademicCity, type);
    }
};
__decorate([
    core_1.ViewChild(material_1.MatPaginator),
    __metadata("design:type", material_1.MatPaginator)
], ListCityManagementComponent.prototype, "paginator", void 0);
ListCityManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'city-management-list.html'
    }),
    __metadata("design:paramtypes", [city_management_service_1.CityManagementService, loader_service_1.LoaderService,
        permission_service_1.PermissionService])
], ListCityManagementComponent);
exports.ListCityManagementComponent = ListCityManagementComponent;
const ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
//# sourceMappingURL=city-management-list.component.js.map