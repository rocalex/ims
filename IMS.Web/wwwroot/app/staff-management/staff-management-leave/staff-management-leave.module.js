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
const staff_management_leave_routes_1 = require("./staff-management-leave.routes");
const staff_management_leave_component_1 = require("./staff-management-leave.component");
const staff_management_leave_service_1 = require("./staff-management-leave.service");
const staff_management_leave_add_component_1 = require("./staff-management-leave-add/staff-management-leave-add.component");
const staff_management_leave_edit_detail_component_1 = require("./staff-management-leave-edit-detail/staff-management-leave-edit-detail.component");
const staff_management_leave_list_component_1 = require("./staff-management-leave-list/staff-management-leave-list.component");
let StaffLeaveManagementModule = class StaffLeaveManagementModule {
};
StaffLeaveManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            staff_management_leave_routes_1.StaffLeaveManagementRouting,
        ],
        declarations: [
            staff_management_leave_component_1.StaffLeaveManagementComponent,
            staff_management_leave_add_component_1.AddStaffLeaveManagementComponent,
            staff_management_leave_edit_detail_component_1.EditAndDetailStaffLeaveManagementComponent,
            staff_management_leave_list_component_1.ListStaffLeaveManagementComponent
        ],
        providers: [
            staff_management_leave_service_1.StaffLeaveManagementService
        ],
    })
], StaffLeaveManagementModule);
exports.StaffLeaveManagementModule = StaffLeaveManagementModule;
//# sourceMappingURL=staff-management-leave.module.js.map