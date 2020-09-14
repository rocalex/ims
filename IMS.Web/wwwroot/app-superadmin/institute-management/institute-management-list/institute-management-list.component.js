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
const institute_management_service_1 = require("../institute-management.service");
const loader_service_1 = require("../../../shared/loader-service");
let InstituteManagementListComponent = class InstituteManagementListComponent {
    constructor(instituteManagementService, loaderService) {
        this.instituteManagementService = instituteManagementService;
        this.loaderService = loaderService;
        this.institutes = [];
    }
    ngOnInit() {
        this.loaderService.toggleLoader(true);
        this.getAllInstitute();
    }
    getAllInstitute() {
        this.instituteManagementService.getAllInstitute().then(res => {
            this.institutes = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
};
InstituteManagementListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-list.html'
    }),
    __metadata("design:paramtypes", [institute_management_service_1.InstituteManagementService, loader_service_1.LoaderService])
], InstituteManagementListComponent);
exports.InstituteManagementListComponent = InstituteManagementListComponent;
//# sourceMappingURL=institute-management-list.component.js.map