"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
const staff_management_dashboard_routes_1 = require("./staff-management-dashboard.routes");
const staff_management_dashboard_component_1 = require("./staff-management-dashboard.component");
const staff_management_dashboard_service_1 = require("./staff-management-dashboard.service");
let StaffManagementDashboardModule = class StaffManagementDashboardModule {
};
StaffManagementDashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            staff_management_dashboard_routes_1.StaffManagementDashboardRouting
        ],
        declarations: [
            staff_management_dashboard_component_1.StaffManagementDashboardComponent
        ],
        providers: [
            staff_management_dashboard_service_1.StaffManagementDashboardService
        ],
    })
], StaffManagementDashboardModule);
exports.StaffManagementDashboardModule = StaffManagementDashboardModule;
//# sourceMappingURL=staff-management-dashboard.module.js.map