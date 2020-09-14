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
const student_management_course_fee_term_service_1 = require("./student-management-course-fee-term.service");
const student_management_course_fee_term_component_1 = require("./student-management-course-fee-term.component");
const student_management_course_fee_term_details_component_1 = require("./student-management-course-fee-term-details/student-management-course-fee-term-details.component");
let CourseFeeTermsManagementModule = class CourseFeeTermsManagementModule {
};
CourseFeeTermsManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_course_fee_term_component_1.CourseFeeTermManagementComponent,
            student_management_course_fee_term_details_component_1.CourseFeeTermDetailsManagementComponent
        ],
        providers: [
            student_management_course_fee_term_service_1.CourseFeeTermsManagementService
        ],
    })
], CourseFeeTermsManagementModule);
exports.CourseFeeTermsManagementModule = CourseFeeTermsManagementModule;
//# sourceMappingURL=student-management-course-fee-term.module.js.map