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
const student_management_caste_component_1 = require("./student-management-caste.component");
const student_management_caste_list_component_1 = require("./student-management-caste-list/student-management-caste-list.component");
const student_management_caste_add_component_1 = require("./student-management-caste-add/student-management-caste-add.component");
const student_management_caste_edit_detail_component_1 = require("./student-management-caste-edit-detail/student-management-caste-edit-detail.component");
const student_management_caste_service_1 = require("./student-management-caste.service");
let CasteManagementModule = class CasteManagementModule {
};
CasteManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_caste_component_1.CasteManagementComponent,
            student_management_caste_list_component_1.ListCasteManagementComponent,
            student_management_caste_add_component_1.AddCasteManagementComponent,
            student_management_caste_edit_detail_component_1.EditAndDetailCasteManagementComponent
        ],
        providers: [
            student_management_caste_service_1.CasteManagementService
        ],
    })
], CasteManagementModule);
exports.CasteManagementModule = CasteManagementModule;
//# sourceMappingURL=student-management-caste.module.js.map