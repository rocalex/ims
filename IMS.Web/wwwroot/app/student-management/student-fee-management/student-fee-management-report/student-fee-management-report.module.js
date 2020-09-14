"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../../shared/shared.module");
const student_fee_management_report_service_1 = require("./student-fee-management-report.service");
const student_fee_management_report_component_1 = require("./student-fee-management-report.component");
const student_fee_management_report_view_component_1 = require("./student-fee-management-report-view/student-fee-management-report-view.component");
const student_fee_management_report_list_component_1 = require("./student-fee-management-report-list/student-fee-management-report-list.component");
let StudentFeeManagementReportModule = class StudentFeeManagementReportModule {
};
StudentFeeManagementReportModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_fee_management_report_component_1.StudentManagementReportComponent,
            student_fee_management_report_list_component_1.StudentFeeManagementReportListComponent,
            student_fee_management_report_view_component_1.StudentFeeManagementReportViewComponent
        ],
        providers: [
            student_fee_management_report_service_1.StudentFeeManagementReportService
        ],
    })
], StudentFeeManagementReportModule);
exports.StudentFeeManagementReportModule = StudentFeeManagementReportModule;
//# sourceMappingURL=student-fee-management-report.module.js.map