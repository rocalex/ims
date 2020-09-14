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
const student_fee_management_feereceipt_service_1 = require("./student-fee-management-feereceipt.service");
const student_fee_management_feereceipt_component_1 = require("./student-fee-management-feereceipt.component");
const student_fee_management_feereceipt_add_component_1 = require("./student-fee-management-feereceipt-add/student-fee-management-feereceipt-add.component");
const student_fee_management_feereceipt_edit_detail_component_1 = require("./student-fee-management-feereceipt-edit-detail/student-fee-management-feereceipt-edit-detail.component");
const student_fee_management_feereceipt_list_component_1 = require("./student-fee-management-feereceipt-list/student-fee-management-feereceipt-list.component");
let StudentFeeManagementFeeReceiptModule = class StudentFeeManagementFeeReceiptModule {
};
StudentFeeManagementFeeReceiptModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_fee_management_feereceipt_component_1.StudentFeeManagementFeeReceiptComponent,
            student_fee_management_feereceipt_add_component_1.AddStudentFeeManagementFeeReceiptComponent,
            student_fee_management_feereceipt_edit_detail_component_1.EditAndDetailStudentFeeManagementFeeReceiptComponent,
            student_fee_management_feereceipt_list_component_1.ListStudentFeeManagementFeeReceiptComponent
        ],
        providers: [
            student_fee_management_feereceipt_service_1.StudentFeeManagementFeeReceiptService
        ]
    })
], StudentFeeManagementFeeReceiptModule);
exports.StudentFeeManagementFeeReceiptModule = StudentFeeManagementFeeReceiptModule;
//# sourceMappingURL=student-fee-management-feereceipt.module.js.map