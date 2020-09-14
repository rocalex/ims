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
const institute_management_component_1 = require("./institute-management.component");
const institute_management_routes_1 = require("./institute-management.routes");
// Academic Year
const institute_management_academic_year_module_1 = require("./institute-management-academic-year/institute-management-academic-year.module");
// Week Off
const institute_management_week_off_module_1 = require("./institute-management-week-off/institute-management-week-off.module");
// Holiday Off
const institute_management_holiday_off_module_1 = require("./institute-management-holiday-off/institute-management-holiday-off.module");
const institute_management_class_module_1 = require("./institute-management-class/institute-management-class.module");
const institute_management_subject_module_1 = require("./institute-management-subject/institute-management-subject.module");
const institute_management_class_subject_mapping_module_1 = require("./institute-management-class-subject-mapping/institute-management-class-subject-mapping.module");
const institute_management_time_table_module_1 = require("./institute-management-time-table/institute-management-time-table.module");
let InstituteManagementModule = class InstituteManagementModule {
};
InstituteManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            institute_management_routes_1.InstituteManagementRouting,
            institute_management_academic_year_module_1.AcademicYearManagementModule,
            institute_management_week_off_module_1.WeekOffManagementModule,
            institute_management_holiday_off_module_1.HolidayOffManagementModule,
            institute_management_class_module_1.ClassManagementModule,
            institute_management_subject_module_1.SubjectManagementModule,
            institute_management_class_subject_mapping_module_1.ClassSubjectMappingManagementModule,
            institute_management_time_table_module_1.TimeTableManagementModule
        ],
        declarations: [
            institute_management_component_1.InstituteManagementComponent
        ],
        providers: [],
    })
], InstituteManagementModule);
exports.InstituteManagementModule = InstituteManagementModule;
//# sourceMappingURL=institute-management.module.js.map