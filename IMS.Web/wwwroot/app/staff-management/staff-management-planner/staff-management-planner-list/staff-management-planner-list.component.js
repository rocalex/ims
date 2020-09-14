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
const loader_service_1 = require("../../../../shared/loader-service");
const staff_management_planner_service_1 = require("../staff-management-planner.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let ListStaffPlannerManagementComponent = class ListStaffPlannerManagementComponent {
    constructor(staffPlannerManagementService, loaderService, permissionService) {
        this.staffPlannerManagementService = staffPlannerManagementService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.plans = [];
    }
    ngOnInit() {
        this.getStaffPlansList();
    }
    // Method for fetching the list of all staff plans
    getStaffPlansList() {
        this.loaderService.toggleLoader(true);
        this.staffPlannerManagementService.getAllStaffPlans()
            .then(res => {
            this.plans = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Staff, sidenav_model_1.UserGroupFeatureChildEnum.StaffPlanner, type);
    }
};
ListStaffPlannerManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-planner-list.html'
    }),
    __metadata("design:paramtypes", [staff_management_planner_service_1.StaffPlannerManagementService,
        loader_service_1.LoaderService, permission_service_1.PermissionService])
], ListStaffPlannerManagementComponent);
exports.ListStaffPlannerManagementComponent = ListStaffPlannerManagementComponent;
//# sourceMappingURL=staff-management-planner-list.component.js.map