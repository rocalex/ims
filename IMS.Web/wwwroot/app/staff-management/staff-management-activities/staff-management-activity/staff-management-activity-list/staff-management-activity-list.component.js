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
const loader_service_1 = require("../../../../../shared/loader-service");
const staff_management_activity_service_1 = require("../staff-management-activity.service");
const sidenav_model_1 = require("../../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../../shared/permission.service");
let ListStaffActivityManagementComponent = class ListStaffActivityManagementComponent {
    constructor(staffActivityManagementService, loaderService, permissionService) {
        this.staffActivityManagementService = staffActivityManagementService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.activities = [];
    }
    ngOnInit() {
        this.getStaffActivitiesList();
    }
    // Method for fetching the list of all staff activities
    getStaffActivitiesList() {
        this.loaderService.toggleLoader(true);
        this.staffActivityManagementService.getAllActivities()
            .then(res => {
            this.activities = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Staff, sidenav_model_1.UserGroupFeatureChildEnum.StaffActivity, type);
    }
};
ListStaffActivityManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-activity-list.html'
    }),
    __metadata("design:paramtypes", [staff_management_activity_service_1.StaffActivityManagementService,
        loader_service_1.LoaderService, permission_service_1.PermissionService])
], ListStaffActivityManagementComponent);
exports.ListStaffActivityManagementComponent = ListStaffActivityManagementComponent;
//# sourceMappingURL=staff-management-activity-list.component.js.map