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
const student_management_gender_component_1 = require("./student-management-gender.component");
const student_management_gender_list_component_1 = require("./student-management-gender-list/student-management-gender-list.component");
const student_management_gender_add_component_1 = require("./student-management-gender-add/student-management-gender-add.component");
const student_management_gender_edit_detail_component_1 = require("./student-management-gender-edit-detail/student-management-gender-edit-detail.component");
const student_management_gender_service_1 = require("./student-management-gender.service");
let GenderManagementModule = class GenderManagementModule {
};
GenderManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_gender_component_1.GenderManagementComponent,
            student_management_gender_list_component_1.ListGenderManagementComponent,
            student_management_gender_add_component_1.AddGenderManagementComponent,
            student_management_gender_edit_detail_component_1.EditAndDetailGenderManagementComponent
        ],
        providers: [
            student_management_gender_service_1.GenderManagementService
        ],
    })
], GenderManagementModule);
exports.GenderManagementModule = GenderManagementModule;
//# sourceMappingURL=student-management-gender.module.js.map