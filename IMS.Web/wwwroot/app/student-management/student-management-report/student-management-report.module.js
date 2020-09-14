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
const student_management_report_service_1 = require("./student-management-report.service");
const student_management_report_routes_1 = require("./student-management-report.routes");
const student_management_report_component_1 = require("./student-management-report.component");
const student_management_report_view_component_1 = require("./student-management-report-view/student-management-report-view.component");
const student_management_report_list_component_1 = require("./student-management-report-list/student-management-report-list.component");
const student_management_report_chart_component_1 = require("./student-management-report-chart/student-management-report-chart.component");
let StudentManagementReportModule = class StudentManagementReportModule {
};
StudentManagementReportModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_management_report_routes_1.StudentManagementReportRouting
        ],
        declarations: [
            student_management_report_component_1.StudentManagementReportComponent,
            student_management_report_list_component_1.StudentManagementReportListComponent,
            student_management_report_view_component_1.StudentManagementReportViewComponent,
            student_management_report_chart_component_1.StudentManagementReportChartComponent
        ],
        providers: [
            student_management_report_service_1.StudentManagementReportService
        ],
    })
], StudentManagementReportModule);
exports.StudentManagementReportModule = StudentManagementReportModule;
//# sourceMappingURL=student-management-report.module.js.map