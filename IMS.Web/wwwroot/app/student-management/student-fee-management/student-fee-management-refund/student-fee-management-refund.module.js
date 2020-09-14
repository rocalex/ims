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
const student_fee_management_refund_component_1 = require("./student-fee-management-refund.component");
const student_fee_management_refund_list_component_1 = require("./student-fee-management-refund-list/student-fee-management-refund-list.component");
const student_fee_management_refund_add_component_1 = require("./student-fee-management-refund-add/student-fee-management-refund-add.component");
const student_fee_management_refund_edit_detail_component_1 = require("./student-fee-management-refund-edit-detail/student-fee-management-refund-edit-detail.component");
const student_fee_management_refund_service_1 = require("./student-fee-management-refund.service");
let StudentFeeManagementRefundModule = class StudentFeeManagementRefundModule {
};
StudentFeeManagementRefundModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_fee_management_refund_component_1.StudentFeeManagementRefundComponent,
            student_fee_management_refund_list_component_1.ListStudentFeeManagementRefundComponent,
            student_fee_management_refund_add_component_1.AddStudentFeeManagementRefundComponent,
            student_fee_management_refund_edit_detail_component_1.EditAndDetailStudentFeeManagementRefundComponent
        ],
        providers: [
            student_fee_management_refund_service_1.StudentFeeManagementRefundService
        ]
    })
], StudentFeeManagementRefundModule);
exports.StudentFeeManagementRefundModule = StudentFeeManagementRefundModule;
//# sourceMappingURL=student-fee-management-refund.module.js.map