"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared/shared.module");
const staff_management_disciplinary_component_1 = require("./staff-management-disciplinary.component");
const staff_management_disciplinary_list_component_1 = require("./staff-management-disciplinary-list/staff-management-disciplinary-list.component");
const staff_management_disciplinary_add_component_1 = require("./staff-management-disciplinary-add/staff-management-disciplinary-add.component");
const staff_management_disciplinary_edit_component_1 = require("./staff-management-disciplinary-edit-detail/staff-management-disciplinary-edit.component");
const staff_management_disciplinary_service_1 = require("./staff-management-disciplinary.service");
const staff_management_disciplinary_routes_1 = require("./staff-management-disciplinary.routes");
let StaffDisciplinaryManagementModule = class StaffDisciplinaryManagementModule {
};
StaffDisciplinaryManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            staff_management_disciplinary_routes_1.DisciplinaryRoutes
        ],
        declarations: [
            staff_management_disciplinary_component_1.StaffDisciplinaryManagementComponent,
            staff_management_disciplinary_list_component_1.ListStaffDisciplinaryManagementComponent,
            staff_management_disciplinary_add_component_1.AddStaffDisciplinaryManagementComponent,
            staff_management_disciplinary_edit_component_1.EditAndDetailStaffDisciplinaryManagementComponent
        ],
        providers: [
            staff_management_disciplinary_service_1.StaffDisciplinaryManagementService
        ],
    })
], StaffDisciplinaryManagementModule);
exports.StaffDisciplinaryManagementModule = StaffDisciplinaryManagementModule;
//# sourceMappingURL=staff-management-disciplinary.module.js.map