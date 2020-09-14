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
const staff_management_notice_component_1 = require("./staff-management-notice.component");
const staff_management_notice_list_component_1 = require("./staff-management-notice-list/staff-management-notice-list.component");
const staff_management_notice_add_component_1 = require("./staff-management-notice-add/staff-management-notice-add.component");
const staff_management_notice_edit_details_component_1 = require("./staff-management-notice-edit-details/staff-management-notice-edit-details.component");
const staff_management_notice_service_1 = require("./staff-management-notice.service");
let StaffNoticeManagementModule = class StaffNoticeManagementModule {
};
StaffNoticeManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            staff_management_notice_component_1.StaffNoticeManagementComponent,
            staff_management_notice_list_component_1.ListNoticeManagementComponent,
            staff_management_notice_add_component_1.AddNoticeManagementComponent,
            staff_management_notice_edit_details_component_1.EditDetailsNoticeManagementComponent
        ],
        providers: [
            staff_management_notice_service_1.StaffNoticeManagementService
        ],
    })
], StaffNoticeManagementModule);
exports.StaffNoticeManagementModule = StaffNoticeManagementModule;
//# sourceMappingURL=staff-management-notice.module.js.map