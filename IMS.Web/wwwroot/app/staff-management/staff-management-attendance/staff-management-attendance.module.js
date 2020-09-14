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
const staff_management_attendance_routes_1 = require("./staff-management-attendance.routes");
const staff_management_attendance_component_1 = require("./staff-management-attendance.component");
const staff_management_attendance_service_1 = require("./staff-management-attendance.service");
let StaffAttendanceManagementModule = class StaffAttendanceManagementModule {
};
StaffAttendanceManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            staff_management_attendance_routes_1.StaffAttendanceManagementRouting,
        ],
        declarations: [
            staff_management_attendance_component_1.StaffAttendanceManagementComponent
        ],
        providers: [
            staff_management_attendance_service_1.StaffAttendanceManagementService
        ],
    })
], StaffAttendanceManagementModule);
exports.StaffAttendanceManagementModule = StaffAttendanceManagementModule;
//# sourceMappingURL=staff-management-attendance.module.js.map