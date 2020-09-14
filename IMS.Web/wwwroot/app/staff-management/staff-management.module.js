"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared/shared.module");
const staff_management_routes_1 = require("./staff-management.routes");
const staff_management_component_1 = require("./staff-management.component");
const staff_management_department_module_1 = require("./staff-management-department/staff-management-department.module");
const staff_management_designation_module_1 = require("./staff-management-designation/staff-management-designation.module");
const staff_management_information_module_1 = require("./staff-management-information/staff-management-information.module");
const staff_management_planner_module_1 = require("./staff-management-planner/staff-management-planner.module");
const staff_management_dashboard_module_1 = require("./staff-management-dashboard/staff-management-dashboard.module");
const staff_management_report_module_1 = require("./staff-management-report/staff-management-report.module");
const staff_management_activities_module_1 = require("./staff-management-activities/staff-management-activities.module");
const staff_management_leave_module_1 = require("./staff-management-leave/staff-management-leave.module");
const staff_management_attendance_module_1 = require("./staff-management-attendance/staff-management-attendance.module");
let StaffManagementModule = class StaffManagementModule {
};
StaffManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            staff_management_routes_1.StaffManagementRouting,
            staff_management_department_module_1.StaffDepartmentManagementModule,
            staff_management_designation_module_1.StaffDesignationManagementModule,
            staff_management_information_module_1.StaffManagementInformationModule,
            staff_management_planner_module_1.StaffPlannerManagementModule,
            staff_management_dashboard_module_1.StaffManagementDashboardModule,
            staff_management_report_module_1.StaffManagementReportModule,
            staff_management_activities_module_1.StaffManagementActivitiesModule,
            staff_management_leave_module_1.StaffLeaveManagementModule,
            staff_management_attendance_module_1.StaffAttendanceManagementModule
        ],
        declarations: [
            staff_management_component_1.StaffManagementComponent
        ],
        providers: [],
    })
], StaffManagementModule);
exports.StaffManagementModule = StaffManagementModule;
//# sourceMappingURL=staff-management.module.js.map