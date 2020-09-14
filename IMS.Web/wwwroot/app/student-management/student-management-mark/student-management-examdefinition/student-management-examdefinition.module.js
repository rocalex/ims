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
const student_management_examdefinition_component_1 = require("./student-management-examdefinition.component");
const student_management_examdefinition_service_1 = require("./student-management-examdefinition.service");
const student_management_examdefinition_add_component_1 = require("./student-management-examdefinition-add/student-management-examdefinition-add.component");
const student_management_examdefinition_edit_detail_component_1 = require("./student-management-examdefinition-edit-detail/student-management-examdefinition-edit-detail.component");
const student_management_examdefinition_list_component_1 = require("./student-management-examdefinition-list/student-management-examdefinition-list.component");
let StudentManagementExamDefinitionModule = class StudentManagementExamDefinitionModule {
};
StudentManagementExamDefinitionModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_examdefinition_component_1.StudentManagementExamDefinitionComponent,
            student_management_examdefinition_add_component_1.AddStudentManagementExamDefinitionComponent,
            student_management_examdefinition_edit_detail_component_1.EditAndDetailStudentManagementExamDefinitionComponent,
            student_management_examdefinition_list_component_1.ListStudentManagementExamDefinitionComponent
        ],
        providers: [
            student_management_examdefinition_service_1.StudentManagementExamDefinitionService
        ],
    })
], StudentManagementExamDefinitionModule);
exports.StudentManagementExamDefinitionModule = StudentManagementExamDefinitionModule;
//# sourceMappingURL=student-management-examdefinition.module.js.map