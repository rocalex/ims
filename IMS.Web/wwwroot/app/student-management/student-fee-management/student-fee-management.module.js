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
const student_fee_management_routes_1 = require("./student-fee-management.routes");
const student_fee_management_component_1 = require("./student-fee-management.component");
const student_management_fee_component_module_1 = require("./student-management-fee-component/student-management-fee-component.module");
const student_management_course_fee_term_module_1 = require("./student-management-course-fee-term/student-management-course-fee-term.module");
const student_fee_management_refund_module_1 = require("./student-fee-management-refund/student-fee-management-refund.module");
const student_fee_management_studentfee_module_1 = require("./student-fee-management-studentfee/student-fee-management-studentfee.module");
const student_fee_management_report_module_1 = require("./student-fee-management-report/student-fee-management-report.module");
const student_fee_management_feereceipt_module_1 = require("./student-fee-management-feereceipt/student-fee-management-feereceipt.module");
let StudentFeeManagementModule = class StudentFeeManagementModule {
};
StudentFeeManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_fee_management_routes_1.StudentFeeManagementRouting,
            student_management_fee_component_module_1.FeeComponentManagementModule,
            student_management_course_fee_term_module_1.CourseFeeTermsManagementModule,
            student_fee_management_refund_module_1.StudentFeeManagementRefundModule,
            student_fee_management_studentfee_module_1.StudentFeeManagementStudentFeeModule,
            student_fee_management_report_module_1.StudentFeeManagementReportModule,
            student_fee_management_feereceipt_module_1.StudentFeeManagementFeeReceiptModule
        ],
        declarations: [
            student_fee_management_component_1.StudentFeeManagementComponent
        ],
        providers: []
    })
], StudentFeeManagementModule);
exports.StudentFeeManagementModule = StudentFeeManagementModule;
//# sourceMappingURL=student-fee-management.module.js.map