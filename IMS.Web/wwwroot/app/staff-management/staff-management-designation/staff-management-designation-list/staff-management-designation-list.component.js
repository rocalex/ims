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
const staff_management_designation_service_1 = require("../staff-management-designation.service");
const loader_service_1 = require("../../../../shared/loader-service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let ListDesignationManagementComponent = class ListDesignationManagementComponent {
    constructor(staffDesignationManagementService, loaderService, permissionService) {
        this.staffDesignationManagementService = staffDesignationManagementService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.designations = [];
    }
    ngOnInit() {
        this.getAllDesignations();
    }
    getAllDesignations() {
        this.loaderService.toggleLoader(true);
        this.staffDesignationManagementService.getAllDesignations()
            .then((res) => {
            this.designations = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch((err) => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Staff, sidenav_model_1.UserGroupFeatureChildEnum.StaffDesignation, type);
    }
};
ListDesignationManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-designation-list.html'
    }),
    __metadata("design:paramtypes", [staff_management_designation_service_1.StaffDesignationManagementService,
        loader_service_1.LoaderService, permission_service_1.PermissionService])
], ListDesignationManagementComponent);
exports.ListDesignationManagementComponent = ListDesignationManagementComponent;
//# sourceMappingURL=staff-management-designation-list.component.js.map