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
const student_management_teachingstaff_component_1 = require("./student-management-teachingstaff.component");
const student_management_teachingstaff_list_component_1 = require("./student-management-teachingstaff-list/student-management-teachingstaff-list.component");
const student_management_teachingstaff_service_1 = require("./student-management-teachingstaff.service");
const student_management_teachingstaff_add_component_1 = require("./student-management-teachingstaff-add/student-management-teachingstaff-add.component");
const student_management_teachingstaff_edit_detail_component_1 = require("./student-management-teachingstaff-edit-detail/student-management-teachingstaff-edit-detail.component");
let TeachingStaffManagementModule = class TeachingStaffManagementModule {
};
TeachingStaffManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_teachingstaff_component_1.TeachingStaffManagementComponent,
            student_management_teachingstaff_list_component_1.ListTeachingStaffManagementComponent,
            student_management_teachingstaff_add_component_1.AddTeachingStaffManagementComponent,
            student_management_teachingstaff_edit_detail_component_1.EditAndDetailTeachingStaffManagementComponent
        ],
        providers: [
            student_management_teachingstaff_service_1.TeachingStaffManagementService
        ],
    })
], TeachingStaffManagementModule);
exports.TeachingStaffManagementModule = TeachingStaffManagementModule;
//# sourceMappingURL=student-management-teachingstaff.module.js.map