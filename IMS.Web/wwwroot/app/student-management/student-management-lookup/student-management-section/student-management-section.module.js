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
const student_management_section_component_1 = require("./student-management-section.component");
const student_management_section_list_component_1 = require("./student-management-section-list/student-management-section-list.component");
const student_management_section_add_component_1 = require("./student-management-section-add/student-management-section-add.component");
const student_management_section_edit_detail_component_1 = require("./student-management-section-edit-detail/student-management-section-edit-detail.component");
const student_management_section_service_1 = require("./student-management-section.service");
let SectionManagementModule = class SectionManagementModule {
};
SectionManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_section_component_1.SectionManagementComponent,
            student_management_section_list_component_1.ListSectionManagementComponent,
            student_management_section_add_component_1.AddSectionManagementComponent,
            student_management_section_edit_detail_component_1.EditAndDetailSectionManagementComponent
        ],
        providers: [
            student_management_section_service_1.SectionManagementService
        ],
    })
], SectionManagementModule);
exports.SectionManagementModule = SectionManagementModule;
//# sourceMappingURL=student-management-section.module.js.map