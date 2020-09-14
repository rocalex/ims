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
const staff_management_report_service_1 = require("./staff-management-report.service");
const staff_management_report_routes_1 = require("./staff-management-report.routes");
const staff_management_report_component_1 = require("./staff-management-report.component");
const staff_management_report_view_component_1 = require("./staff-management-report-view/staff-management-report-view.component");
const staff_management_report_list_component_1 = require("./staff-management-report-list/staff-management-report-list.component");
const staff_management_report_chart_component_1 = require("./staff-management-report-chart/staff-management-report-chart.component");
let StaffManagementReportModule = class StaffManagementReportModule {
};
StaffManagementReportModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            staff_management_report_routes_1.StaffManagementReportRouting
        ],
        declarations: [
            staff_management_report_component_1.StaffManagementReportComponent,
            staff_management_report_list_component_1.StaffManagementReportListComponent,
            staff_management_report_view_component_1.StaffManagementReportViewComponent,
            staff_management_report_chart_component_1.StaffManagementReportChartComponent
        ],
        providers: [
            staff_management_report_service_1.StaffManagementReportService
        ],
    })
], StaffManagementReportModule);
exports.StaffManagementReportModule = StaffManagementReportModule;
//# sourceMappingURL=staff-management-report.module.js.map