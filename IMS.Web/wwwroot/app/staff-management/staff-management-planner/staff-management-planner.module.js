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
const staff_management_planner_routes_1 = require("./staff-management-planner.routes");
const staff_management_planner_service_1 = require("./staff-management-planner.service");
const staff_management_planner_component_1 = require("./staff-management-planner.component");
const staff_management_planner_list_component_1 = require("./staff-management-planner-list/staff-management-planner-list.component");
const staff_management_planner_add_component_1 = require("./staff-management-planner-add/staff-management-planner-add.component");
const staff_management_planner_edit_details_component_1 = require("./staff-management-planner-edit-details/staff-management-planner-edit-details.component");
let StaffPlannerManagementModule = class StaffPlannerManagementModule {
};
StaffPlannerManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            staff_management_planner_routes_1.StaffPlannerManagementRouting
        ],
        declarations: [
            staff_management_planner_component_1.StaffPlannerManagementComponent,
            staff_management_planner_list_component_1.ListStaffPlannerManagementComponent,
            staff_management_planner_add_component_1.AddStaffPlannerManagementComponent,
            staff_management_planner_edit_details_component_1.EditDetailsStaffPlannerManagementComponent
        ],
        providers: [
            staff_management_planner_service_1.StaffPlannerManagementService
        ],
    })
], StaffPlannerManagementModule);
exports.StaffPlannerManagementModule = StaffPlannerManagementModule;
//# sourceMappingURL=staff-management-planner.module.js.map