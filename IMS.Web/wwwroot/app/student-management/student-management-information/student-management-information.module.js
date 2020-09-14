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
const student_management_information_routes_1 = require("./student-management-information.routes");
const student_management_information_component_1 = require("./student-management-information.component");
const student_management_information_list_component_1 = require("./student-management-information-list/student-management-information-list.component");
const student_management_information_add_component_1 = require("./student-management-information-add/student-management-information-add.component");
const student_management_information_edit_detail_component_1 = require("./student-management-information-edit-detail/student-management-information-edit-detail.component");
const student_management_information_service_1 = require("./student-management-information.service");
const classlist_component_1 = require("./student-class-list/classlist.component");
let StudentInformationManagementModule = class StudentInformationManagementModule {
};
StudentInformationManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_management_information_routes_1.StudentInformationManagementRouting
        ],
        declarations: [
            student_management_information_component_1.StudentInformationManagementComponent,
            student_management_information_list_component_1.ListStudentInformationManagementComponent,
            student_management_information_add_component_1.AddStudentInformationManagementComponent,
            student_management_information_edit_detail_component_1.EditAndDetailStudentInformationManagementComponent,
            classlist_component_1.ClassListComponent
        ],
        providers: [
            student_management_information_service_1.StudentManagementService
        ],
    })
], StudentInformationManagementModule);
exports.StudentInformationManagementModule = StudentInformationManagementModule;
//# sourceMappingURL=student-management-information.module.js.map