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
const student_management_component_1 = require("./student-management.component");
const student_management_routes_1 = require("./student-management.routes");
const student_management_information_module_1 = require("./student-management-information/student-management-information.module");
const student_management_lookup_module_1 = require("./student-management-lookup/student-management-lookup.module");
const student_management_inactive_module_1 = require("./student-management-inactive/student-management-inactive.module");
const student_management_notification_module_1 = require("./student-management-notification/student-management-notification.module");
const student_management_relieving_module_1 = require("./student-management-relieving/student-management-relieving.module");
const student_management_dashboard_module_1 = require("./student-management-dashboard/student-management-dashboard.module");
const student_management_articles_module_1 = require("./student-management-articles/student-management-articles.module");
const student_management_promotion_module_1 = require("./student-management-promotion/student-management-promotion.module");
const student_management_attendance_module_1 = require("./student-management-attendance/student-management-attendance.module");
const student_fee_management_module_1 = require("./student-fee-management/student-fee-management.module");
const student_management_mark_module_1 = require("./student-management-mark/student-management-mark.module");
const student_management_report_module_1 = require("./student-management-report/student-management-report.module");
const student_management_leave_module_1 = require("./student-management-leave/student-management-leave.module");
let StudentManagementModule = class StudentManagementModule {
};
StudentManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_management_routes_1.StudentManagementRouting,
            student_management_lookup_module_1.StudentManagementLookupModule,
            student_management_information_module_1.StudentInformationManagementModule,
            student_management_inactive_module_1.StudentManagementInActiveModule,
            student_management_notification_module_1.StudentManagementNotificationModule,
            student_management_relieving_module_1.StudentRelievingManagementModule,
            student_management_dashboard_module_1.StudentManagementDashboardModule,
            student_management_articles_module_1.StudentManagementArticlesModule,
            student_management_promotion_module_1.StudentPromotionManagementModule,
            student_management_attendance_module_1.StudentAttendanceManagementModule,
            student_fee_management_module_1.StudentFeeManagementModule,
            student_management_mark_module_1.StudentManagementMarkModule,
            student_management_report_module_1.StudentManagementReportModule,
            student_management_leave_module_1.StudentLeaveManagementModule
        ],
        declarations: [
            student_management_component_1.StudentManagementComponent
        ],
        providers: [],
    })
], StudentManagementModule);
exports.StudentManagementModule = StudentManagementModule;
//# sourceMappingURL=student-management.module.js.map