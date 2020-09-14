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
// Services
const institute_management_academic_year_service_1 = require("../institute-management-academic-year.service");
const loader_service_1 = require("../../../../shared/loader-service");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
let ListAcademicYearManagementComponent = class ListAcademicYearManagementComponent {
    constructor(academicYearManagementService, permissionService, loaderService) {
        this.academicYearManagementService = academicYearManagementService;
        this.permissionService = permissionService;
        this.loaderService = loaderService;
        this.academicYears = [];
    }
    ngOnInit() {
        this.getInstituteAcademicYearsList();
    }
    getInstituteAcademicYearsList() {
        this.loaderService.toggleLoader(true);
        this.academicYearManagementService.getInstituteAcademicYearsList()
            .then((res) => {
            this.academicYears = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch((err) => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Administration, sidenav_model_1.UserGroupFeatureChildEnum.InstituteAcademicYear, type);
    }
};
ListAcademicYearManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-academic-year-list.html'
    }),
    __metadata("design:paramtypes", [institute_management_academic_year_service_1.AcademicYearManagementService, permission_service_1.PermissionService,
        loader_service_1.LoaderService])
], ListAcademicYearManagementComponent);
exports.ListAcademicYearManagementComponent = ListAcademicYearManagementComponent;
//# sourceMappingURL=institute-management-academic-year-list.component.js.map