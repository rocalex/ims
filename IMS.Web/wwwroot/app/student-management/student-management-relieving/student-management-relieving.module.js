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
const student_management_relieving_routes_1 = require("./student-management-relieving.routes");
const student_management_relieving_component_1 = require("./student-management-relieving.component");
const student_management_relieving_list_component_1 = require("./student-management-relieving-list/student-management-relieving-list.component");
const student_management_relieving_add_component_1 = require("./student-management-relieving-add/student-management-relieving-add.component");
const student_management_relieving_edit_detail_component_1 = require("./student-management-relieving-edit-detail/student-management-relieving-edit-detail.component");
const student_management_relieving_service_1 = require("./student-management-relieving.service");
let StudentRelievingManagementModule = class StudentRelievingManagementModule {
};
StudentRelievingManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_management_relieving_routes_1.StudentRelievingManagementRouting
        ],
        declarations: [
            student_management_relieving_component_1.StudentRelievingManagementComponent,
            student_management_relieving_list_component_1.ListStudentRelievingManagementComponent,
            student_management_relieving_add_component_1.AddStudentRelievingManagementComponent,
            student_management_relieving_edit_detail_component_1.EditAndDetailStudentRelievingManagementComponent
        ],
        providers: [
            student_management_relieving_service_1.StudentRelievingManagementService
        ],
    })
], StudentRelievingManagementModule);
exports.StudentRelievingManagementModule = StudentRelievingManagementModule;
//# sourceMappingURL=student-management-relieving.module.js.map