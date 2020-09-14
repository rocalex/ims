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
const staff_management_activity_service_1 = require("./staff-management-activity.service");
const staff_management_activity_component_1 = require("./staff-management-activity.component");
const staff_management_activity_list_component_1 = require("./staff-management-activity-list/staff-management-activity-list.component");
const staff_management_activity_add_component_1 = require("./staff-management-activity-add/staff-management-activity-add.component");
const staff_management_activity_edit_details_component_1 = require("./staff-management-activity-edit-details/staff-management-activity-edit-details.component");
let StaffActivityManagementModule = class StaffActivityManagementModule {
};
StaffActivityManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            staff_management_activity_component_1.StaffActivityManagementComponent,
            staff_management_activity_list_component_1.ListStaffActivityManagementComponent,
            staff_management_activity_add_component_1.AddStaffActivityManagementComponent,
            staff_management_activity_edit_details_component_1.EditDetailsStaffActivityManagementComponent
        ],
        providers: [
            staff_management_activity_service_1.StaffActivityManagementService
        ],
    })
], StaffActivityManagementModule);
exports.StaffActivityManagementModule = StaffActivityManagementModule;
//# sourceMappingURL=staff-management-activity.module.js.map