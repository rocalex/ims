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
const student_management_qualification_component_1 = require("./student-management-qualification.component");
const student_management_qualification_list_component_1 = require("./student-management-qualification-list/student-management-qualification-list.component");
const student_management_qualification_add_component_1 = require("./student-management-qualification-add/student-management-qualification-add.component");
const student_management_qualification_edit_detail_component_1 = require("./student-management-qualification-edit-detail/student-management-qualification-edit-detail.component");
const student_management_qualification_service_1 = require("./student-management-qualification.service");
let QualificationManagementModule = class QualificationManagementModule {
};
QualificationManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_qualification_component_1.QualificationManagementComponent,
            student_management_qualification_list_component_1.ListQualificationManagementComponent,
            student_management_qualification_add_component_1.AddQualificationManagementComponent,
            student_management_qualification_edit_detail_component_1.EditAndDetailQualificationManagementComponent
        ],
        providers: [
            student_management_qualification_service_1.QualificationManagementService
        ],
    })
], QualificationManagementModule);
exports.QualificationManagementModule = QualificationManagementModule;
//# sourceMappingURL=student-management-qualification.module.js.map