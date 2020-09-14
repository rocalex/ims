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
const staff_management_designation_routes_1 = require("./staff-management-designation.routes");
const staff_management_designation_component_1 = require("./staff-management-designation.component");
const staff_management_designation_list_component_1 = require("./staff-management-designation-list/staff-management-designation-list.component");
const staff_management_designation_add_component_1 = require("./staff-management-designation-add/staff-management-designation-add.component");
const staff_management_designation_edit_details_component_1 = require("./staff-management-designation-edit-details/staff-management-designation-edit-details.component");
const staff_management_designation_service_1 = require("./staff-management-designation.service");
let StaffDesignationManagementModule = class StaffDesignationManagementModule {
};
StaffDesignationManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            staff_management_designation_routes_1.StaffDesignationManagementRouting
        ],
        declarations: [
            staff_management_designation_component_1.StaffDesignationManagementComponent,
            staff_management_designation_list_component_1.ListDesignationManagementComponent,
            staff_management_designation_add_component_1.AddDesignationManagementComponent,
            staff_management_designation_edit_details_component_1.EditDetailsDesignationManagementComponent
        ],
        providers: [
            staff_management_designation_service_1.StaffDesignationManagementService
        ],
    })
], StaffDesignationManagementModule);
exports.StaffDesignationManagementModule = StaffDesignationManagementModule;
//# sourceMappingURL=staff-management-designation.module.js.map