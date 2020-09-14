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
const student_management_blood_group_component_1 = require("./student-management-blood-group.component");
const student_management_blood_group_list_component_1 = require("./student-management-blood-group-list/student-management-blood-group-list.component");
const student_management_blood_group_add_component_1 = require("./student-management-blood-group-add/student-management-blood-group-add.component");
const student_management_blood_group_edit_detail_component_1 = require("./student-management-blood-group-edit-detail/student-management-blood-group-edit-detail.component");
const student_management_blood_group_service_1 = require("./student-management-blood-group.service");
let BloodGroupManagementModule = class BloodGroupManagementModule {
};
BloodGroupManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_blood_group_component_1.BloodGroupManagementComponent,
            student_management_blood_group_list_component_1.ListBloodGroupManagementComponent,
            student_management_blood_group_add_component_1.AddBloodGroupManagementComponent,
            student_management_blood_group_edit_detail_component_1.EditAndDetailBloodGroupManagementComponent
        ],
        providers: [
            student_management_blood_group_service_1.BloodGroupManagementService
        ],
    })
], BloodGroupManagementModule);
exports.BloodGroupManagementModule = BloodGroupManagementModule;
//# sourceMappingURL=student-management-blood-group.module.js.map