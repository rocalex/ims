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
const student_management_leavetype_component_1 = require("./student-management-leavetype.component");
const student_management_leavetype_list_component_1 = require("./student-management-leavetype-list/student-management-leavetype-list.component");
const student_management_leavetype_add_component_1 = require("./student-management-leavetype-add/student-management-leavetype-add.component");
const student_management_leavetype_edit_detail_component_1 = require("./student-management-leavetype-edit-detail/student-management-leavetype-edit-detail.component");
const student_management_leavetype_service_1 = require("./student-management-leavetype.service");
let LeaveTypeManagementModule = class LeaveTypeManagementModule {
};
LeaveTypeManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_leavetype_component_1.LeaveTypeManagementComponent,
            student_management_leavetype_list_component_1.ListLeaveTypeManagementComponent,
            student_management_leavetype_add_component_1.AddLeaveTypeManagementComponent,
            student_management_leavetype_edit_detail_component_1.EditAndDetailLeaveTypeManagementComponent
        ],
        providers: [
            student_management_leavetype_service_1.LeaveTypeManagementService
        ],
    })
], LeaveTypeManagementModule);
exports.LeaveTypeManagementModule = LeaveTypeManagementModule;
//# sourceMappingURL=student-management-leavetype.module.js.map