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
const student_management_attendance_routes_1 = require("./student-management-attendance.routes");
const student_management_attendance_component_1 = require("./student-management-attendance.component");
const student_management_attendance_service_1 = require("./student-management-attendance.service");
let StudentAttendanceManagementModule = class StudentAttendanceManagementModule {
};
StudentAttendanceManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_management_attendance_routes_1.StudentAttendanceManagementRouting,
        ],
        declarations: [
            student_management_attendance_component_1.StudentAttendanceManagementComponent
        ],
        providers: [
            student_management_attendance_service_1.StudentAttendanceManagementService
        ],
    })
], StudentAttendanceManagementModule);
exports.StudentAttendanceManagementModule = StudentAttendanceManagementModule;
//# sourceMappingURL=student-management-attendance.module.js.map